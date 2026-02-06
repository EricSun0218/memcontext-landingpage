import React, { useState, useEffect } from 'react';
import { Plus, MoreVertical, X, Check, Copy, ChevronDown, Loader2 } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { supabase } from '../lib/supabaseClient';

interface ApiKey {
  id: string;
  name: string;
  projectId?: string | null;
  prefix: string;
  fullKey?: string;
  expiresAt: string;
  createdAt: string;
  lastUsed: string;
}

interface ApiKeyResponse {
  user_id: string;
  Project_Name: string;
  User_API_Key: string;
  Project_Id: string;
  Expires_At: number;
  Created_At: number;
  Last_Used: number | null;
  message: string;
}

const EXPIRATION_OPTIONS = [
  '1 Year',
  '6 Months',
  '30 Days',
  '7 Days',
  '24 Hours',
  'Never'
];

// 修正类型：使用字符串键和字符串值
const EXPIRATION_MAP: {[key: string]: string} = {
  '24 Hours': '24 hours',
  '7 Days': '7 days',
  '30 Days': '30 days',
  '6 Months': '6 months',
  '1 Year': '1 year',
  'Never': 'Never'
};

const ApiKeys: React.FC = () => {

  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [editName, setEditName] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [editError, setEditError] = useState('');
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [revokeError, setRevokeError] = useState('');
  const [newName, setNewName] = useState('');
  const [expiration, setExpiration] = useState('1 Year');
  const [createdKeyData, setCreatedKeyData] = useState<{name: string, key: string} | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // 获取 API 基础 URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
  

  useEffect(() => {
    if (isCreateModalOpen) {
      setNewName(''); 
      setExpiration('1 Year');
    }
  }, [isCreateModalOpen]);

  useEffect(() => {
    if (isEditModalOpen && editingKey) {
      setEditName(editingKey.name);
      setEditError('');
    }
  }, [isEditModalOpen, editingKey]);

  const generateRandomName = () => {
    const adjectives = ['mealy', 'dazzling', 'abundant', 'nice', 'ancient', 'rapid'];
    const nouns = ['scientist', 'fountain', 'journalist', 'knife', 'candle', 'river'];
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]}-${adjectives[Math.floor(Math.random() * adjectives.length)]}-${nouns[Math.floor(Math.random() * nouns.length)]}`;
  };

  const maskKey = (rawKey: string) => {
    if (!rawKey) return '';
    const prefix = rawKey.startsWith('sk_mem_')
      ? rawKey.slice(0, 7)
      : rawKey.startsWith('sk_')
        ? rawKey.slice(0, 6)
        : rawKey.slice(0, 4);
    const suffix = rawKey.slice(-8);
    return `${prefix}..._${suffix}`;
  };

  const formatDateTime = (value?: string | number | null) => {
    // 如果值是 null、undefined、-1 或 0，返回 Never
    if (value === null || value === undefined || value === -1 || value === 0) {
      return 'Never';
    }
    
    if (typeof value === 'number') {
      // 判断是否是秒级时间戳（小于 10^12 认为是秒级）
      const timestamp = value < 10000000000 ? value * 1000 : value;
      const date = new Date(timestamp);
      
      // 如果日期无效，返回 Never
      if (Number.isNaN(date.getTime())) {
        return 'Never';
      }
      
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const min = String(date.getMinutes()).padStart(2, '0');
      const ss = String(date.getSeconds()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
    }
    
    // 处理字符串类型的日期
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };

  const mapRowToKey = (row: {
    Project_Name?: string | null;
    User_API_Key?: string | null;
    Expires_At?: string | number | null;
    Created_At?: string | number | null;
    Last_Used?: string | number | null;
    Project_Id?: string | null;
  }): ApiKey => {
    // 对于 Created_At，如果是 0 或 -1，应该显示 Never，但正常情况下不应该出现
    // 不过为了安全，还是使用 formatDateTime 处理
    return {
      id: row.User_API_Key ?? crypto.randomUUID(),
      name: row.Project_Name ?? '',
      projectId: row.Project_Id ?? null,
      prefix: maskKey(row.User_API_Key ?? ''),
      expiresAt: formatDateTime(row.Expires_At),
      createdAt: formatDateTime(row.Created_At),
      lastUsed: formatDateTime(row.Last_Used),
    };
  };

  const fetchKeys = async () => {
    setIsLoading(true);
    setLoadError('');

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      setLoadError(userError.message);
      setIsLoading(false);
      return;
    }
    const userId = userData.user?.id ?? null;
    if (!userId) {
      setLoadError('Not authenticated');
      setIsLoading(false);
      return;
    }
    setCurrentUserId(userId);

    const { data, error } = await supabase
      .from('User_API_Keys_manager')
      .select('Project_Name,User_API_Key,Expires_At,Created_At,Last_Used,Project_Id')
      .eq('user_id', userId)
      .order('Created_At', { ascending: false });

    if (error) {
      setLoadError(error.message);
      setIsLoading(false);
      return;
    }

    setKeys((data ?? []).map(mapRowToKey));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  // 根据用户选择发送对应的字符串给后端
  const getExpirationValueForBackend = (): string => {
    return EXPIRATION_MAP[expiration];
  };

  const handleCreate = async () => {
    setCreateError('');
    if (!currentUserId) {
      setCreateError('Not authenticated');
      return;
    }
    
    const finalName = newName.trim() || generateRandomName();
    const expirationValue = getExpirationValueForBackend();

    setIsCreating(true);
    try {
      console.log('API 基础 URL:', API_BASE_URL);
      console.log('请求数据:', {
        user_id: currentUserId,
        Project_Name: finalName,
        Expires_At: expirationValue
      });

      // 构建请求数据，根据用户选择发送对应的字符串
      const requestData: any = {
        user_id: currentUserId,
        Project_Name: finalName,
        Expires_At: expirationValue
      };

      const response = await fetch(`${API_BASE_URL}/generate-api-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('响应状态:', response.status);
      console.log('响应状态文本:', response.statusText);

      // 读取原始响应文本
      const responseText = await response.text();
      console.log('原始响应文本:', responseText);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          // 尝试解析错误响应
          if (responseText) {
            const errorData = JSON.parse(responseText);
            console.log('后端错误数据:', errorData);
            
            // 处理不同的错误格式
            if (typeof errorData === 'string') {
              errorMessage = errorData;
            } else if (typeof errorData === 'object') {
              // 从错误对象中提取消息
              if (errorData.detail) {
                errorMessage = errorData.detail;
              } else if (errorData.message) {
                errorMessage = errorData.message;
              } else if (errorData.error) {
                errorMessage = errorData.error;
              } else {
                // 尝试将对象转为字符串
                try {
                  errorMessage = JSON.stringify(errorData);
                } catch {
                  errorMessage = String(errorData);
                }
              }
            }
          }
        } catch (jsonError) {
          // 如果无法解析 JSON，使用原始文本
          errorMessage = responseText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      // 尝试解析成功的响应
      let result: ApiKeyResponse;
      try {
        if (!responseText) {
          throw new Error('响应体为空');
        }
        result = JSON.parse(responseText);
        console.log('解析后的响应:', result);
      } catch (jsonError) {
        console.error('解析响应 JSON 失败:', jsonError);
        console.error('响应文本:', responseText);
        throw new Error(`Response is not valid JSON: ${responseText.substring(0, 100)}...`);
      }

      // 处理时间戳：后端返回的是秒级时间戳，直接使用 formatDateTime 处理
      const expiresAtDisplay = formatDateTime(result.Expires_At);
      const createdAtDisplay = formatDateTime(result.Created_At);
      const lastUsedDisplay = formatDateTime(result.Last_Used);

      const newKey: ApiKey = {
        id: result.User_API_Key,
        name: result.Project_Name,
        projectId: result.Project_Id,
        prefix: maskKey(result.User_API_Key),
        fullKey: result.User_API_Key,
        expiresAt: expiresAtDisplay,
        createdAt: createdAtDisplay,
        lastUsed: lastUsedDisplay,
      };

      // 添加到列表中
      setKeys(prev => [newKey, ...prev]);

      // 设置创建成功的显示数据
      setCreatedKeyData({
        name: result.Project_Name,
        key: result.User_API_Key
      });
      
      // 关闭创建弹窗，打开成功弹窗
      setIsCreateModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error: any) {
      console.error('Failed to create API Key:', error);
      console.error('Error stack:', error.stack);
      
      let userFriendlyError = error.message || 'Failed to create API Key';
      
      // 确保错误信息是字符串
      if (typeof userFriendlyError !== 'string') {
        try {
          userFriendlyError = JSON.stringify(userFriendlyError);
        } catch {
          userFriendlyError = String(userFriendlyError);
        }
      }
      
      // 简化错误信息，移除调试信息
      if (userFriendlyError.includes('Unexpected end of JSON input')) {
        userFriendlyError = 'Backend returned empty response, please check if the backend service is running properly';
      } else if (userFriendlyError.includes('Failed to fetch')) {
        userFriendlyError = 'Unable to connect to backend service';
      } else if (userFriendlyError.includes('CORS')) {
        userFriendlyError = 'Cross-origin request blocked';
      } else if (userFriendlyError.includes('404')) {
        userFriendlyError = 'API endpoint not found';
      } else if (userFriendlyError.includes('422')) {
        userFriendlyError = 'Request data validation failed: ' + userFriendlyError;
      }
      
      setCreateError(userFriendlyError);
    } finally {
      setIsCreating(false);
    }
  };

  const handleOpenEdit = (key: ApiKey) => {
    setEditingKey(key);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingKey) return;
    const trimmedName = editName.trim();
    if (!trimmedName) {
      setEditError('Name cannot be empty');
      return;
    }
    if (!currentUserId) {
      setEditError('Not authenticated');
      return;
    }

    setIsSavingEdit(true);
    setEditError('');
    const { error } = await supabase
      .from('User_API_Keys_manager')
      .update({ Project_Name: trimmedName })
      .eq('User_API_Key', editingKey.id)
      .eq('user_id', currentUserId);

    setIsSavingEdit(false);

    if (error) {
      setEditError(error.message);
      return;
    }

    setKeys((prev) =>
      prev.map((item) => (item.id === editingKey.id ? { ...item, name: trimmedName } : item))
    );
    setIsEditModalOpen(false);
    setEditingKey(null);
  };

  const handleRevoke = async (key: ApiKey) => {
    const confirmed = window.confirm(`Confirm to revoke this Key?\n${key.name}`);
    if (!confirmed) return;
    if (!currentUserId) {
      setRevokeError('Not authenticated');
      return;
    }

    setRevokeError('');
    setRevokingId(key.id);

    const { error } = await supabase
      .from('User_API_Keys_manager')
      .delete()
      .eq('User_API_Key', key.id)
      .eq('user_id', currentUserId);

    setRevokingId(null);

    if (error) {
      setRevokeError(error.message);
      return;
    }

    setKeys((prev) => prev.filter((item) => item.id !== key.id));
  };

  const copyFallback = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };
  
  const handleCopy = async () => {
    const text = createdKeyData?.key;
    if (!text) return;
  
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        copyFallback(text);
      }
  
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
      copyFallback(text);
    }
  };
  
  const handleCopyAndClose = async () => {
    await handleCopy();
    setTimeout(() => {
      setIsSuccessModalOpen(false);
    }, 300);
  };
  
  return (
    <div className="flex-1 overflow-y-auto bg-background p-8 transition-colors duration-300 relative">
      
     

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
            <h1 className="text-2xl font-semibold text-textMain mb-1">API Keys</h1>
            <p className="text-textMuted text-sm">Managing keys for <span className="font-semibold text-textMain">NeuroBot</span></p>
        </div>
        
        <div className="flex gap-3">
             <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 bg-white text-black border border-zinc-200 rounded-md text-sm font-medium hover:bg-zinc-100 transition-colors flex items-center shadow-sm"
             >
                <Plus className="w-4 h-4 mr-2" />
                Create API Key
             </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border text-xs font-semibold text-textMain bg-surfaceHighlight/30">
            <div className="col-span-2">Name</div>
            <div className="col-span-3">Key</div>
            <div className="col-span-2">Expires At</div>
            <div className="col-span-2">Created At</div>
            <div className="col-span-2">Last Used</div>
            <div className="col-span-1 text-right">Actions</div>
        </div>

        {revokeError && (
            <div className="px-6 py-4 text-sm text-red-400">
                Revocation failed: {revokeError}
            </div>
        )}

        {isLoading && (
            <div className="px-6 py-8 text-sm text-textMuted flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading API Keys...
            </div>
        )}

        {!isLoading && loadError && (
            <div className="px-6 py-8 text-sm text-red-400">
                Failed to load: {loadError}
            </div>
        )}

        {!isLoading && !loadError && keys.length === 0 && (
            <div className="px-6 py-8 text-sm text-textMuted">
                No API Keys yet
            </div>
        )}

        {!isLoading && !loadError && keys.map((key) => (
            <div key={key.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border text-sm hover:bg-surfaceHighlight transition-colors items-center group">
                <div className="col-span-2 text-textMain font-medium truncate pr-2" title={key.name}>{key.name}</div>
                <div className="col-span-3 text-textMuted font-mono text-xs">{key.prefix}</div>
                <div className="col-span-2 text-textMuted text-xs">{key.expiresAt}</div>
                <div className="col-span-2 text-textMuted text-xs">{key.createdAt}</div>
                <div className="col-span-2 text-textMuted text-xs">{key.lastUsed}</div>
                <div className="col-span-1 flex justify-end items-center text-textMuted text-xs">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity outline-none">
                                <MoreVertical className="w-4 h-4 text-textMuted cursor-pointer hover:text-textMain" />
                            </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content className="min-w-[140px] bg-card border border-border rounded-md shadow-xl p-1 z-50 animate-in fade-in zoom-in-95 duration-100" align="end">
                                <DropdownMenu.Item
                                  onSelect={() => handleOpenEdit(key)}
                                  className="text-textMain text-sm px-2 py-1.5 hover:bg-surfaceHighlight rounded cursor-pointer outline-none"
                                >
                                    Edit name
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                  onSelect={() => handleRevoke(key)}
                                  className="text-red-500 text-sm px-2 py-1.5 hover:bg-surfaceHighlight rounded cursor-pointer outline-none"
                                >
                                    {revokingId === key.id ? 'Revoking...' : 'Revoke key'}
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </div>
            </div>
        ))}
      </div>

      {/* CREATE API KEY MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-lg font-semibold text-textMain">New API Key</h2>
                    <button onClick={() => setIsCreateModalOpen(false)} className="text-textMuted hover:text-textMain transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-textMuted text-sm mb-6">Create new API key for your organization.</p>

                <div className="flex gap-4 mb-8">
                    <div className="flex-1 space-y-2">
                        <label className="text-xs font-medium text-textMain">Name (Optional)</label>
                        <input 
                            type="text" 
                            placeholder="mealy-helpless-scientist" 
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-textMain placeholder-textMuted/50 focus:outline-none focus:border-textMuted transition-colors"
                        />
                    </div>
                    <div className="w-32 space-y-2 relative">
                        <label className="text-xs font-medium text-textMain">Expires In</label>
                        <div 
                            className="relative"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <button className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-textMain flex items-center justify-between hover:border-textMuted transition-colors focus:outline-none">
                                <span>{expiration}</span>
                                <ChevronDown className="w-4 h-4 text-textMuted" />
                            </button>

                            {isDropdownOpen && (
                                <>
                                <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(false); }}></div>
                                <div className="absolute top-full right-0 left-0 mt-1 bg-white dark:bg-zinc-800 border border-border rounded-md shadow-lg z-20 py-1 max-h-60 overflow-auto">
                                    {EXPIRATION_OPTIONS.map((opt) => (
                                        <div 
                                            key={opt}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setExpiration(opt);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="px-3 py-2 text-sm text-textMain hover:bg-surfaceHighlight cursor-pointer flex items-center justify-between"
                                        >
                                            {opt}
                                            {expiration === opt && <Check className="w-3.5 h-3.5 text-textMain" />}
                                        </div>
                                    ))}
                                </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {createError && (
                    <div className="mb-4 text-xs text-red-400 whitespace-pre-line">
                        Error: {createError}
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <button 
                        onClick={() => setIsCreateModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-textMain hover:bg-surfaceHighlight rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleCreate}
                        disabled={isCreating}
                        className="px-4 py-2 text-sm font-medium bg-textMain text-background rounded-md hover:opacity-90 transition-opacity shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isCreating ? 'Creating...' : 'Create secret key'}
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {isSuccessModalOpen && createdKeyData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-textMain mb-2">API Key Created</h2>
                    <p className="text-textMuted text-sm leading-relaxed">
                        Please save your secret key in a safe place since <span className="font-semibold text-textMain">you won't be able to view it again</span>. 
                        Keep it secure, as anyone with your API key can make requests on your behalf. If you do lose it, you'll need to generate a new one.
                    </p>
                </div>

                <div className="relative mb-8 group">
                    <input 
                        type="text" 
                        readOnly 
                        value={createdKeyData.key}
                        className="w-full bg-input border border-border rounded-md pl-4 pr-10 py-3 text-sm font-mono text-textMain focus:outline-none focus:border-textMuted"
                    />
                    <button 
                        onClick={handleCopy}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-textMuted hover:text-textMain rounded-md hover:bg-surfaceHighlight transition-colors"
                    >
                        {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>

                <div className="flex justify-end gap-3">
                    <button 
                        onClick={() => setIsSuccessModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-textMain hover:bg-surfaceHighlight rounded-md transition-colors border border-border bg-white dark:bg-transparent"
                    >
                        Close
                    </button>
                    <button 
                        onClick={handleCopyAndClose}
                        className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2"
                    >
                        <Copy className="w-4 h-4" />
                        Copy & Close
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* EDIT NAME MODAL */}
      {isEditModalOpen && editingKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-lg font-semibold text-textMain">Edit name</h2>
                    <button onClick={() => setIsEditModalOpen(false)} className="text-textMuted hover:text-textMain transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-textMuted text-sm mb-6">Update the name for this API key.</p>

                <div className="space-y-2 mb-6">
                    <label className="text-xs font-medium text-textMain">Name</label>
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-textMain placeholder-textMuted/50 focus:outline-none focus:border-textMuted transition-colors"
                    />
                    {editError && <p className="text-xs text-red-400">{editError}</p>}
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setIsEditModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-textMain hover:bg-surfaceHighlight rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveEdit}
                        disabled={isSavingEdit}
                        className="px-4 py-2 text-sm font-medium bg-textMain text-background rounded-md hover:opacity-90 transition-opacity shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSavingEdit ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default ApiKeys;
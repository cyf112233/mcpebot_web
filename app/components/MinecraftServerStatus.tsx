'use client';

import { useEffect, useState } from 'react';
import './minecraft-styles.css';

interface ServerStatus {
  online: boolean;
  ip?: string;
  port?: number;
  version?: string;
  players?: {
    online: number;
    max: number;
    list?: Array<{
      name: string;
      uuid: string;
    }>;
  };
  motd?: {
    clean: string[];
    html?: string[];
  };
  icon?: string;
}

export default function MinecraftServerStatus() {
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/minecraft-status', {
          headers: {
            'User-Agent': 'MinecraftStatusChecker/1.0 (Web Client)'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error fetching server status: ${response.status}`);
        }
        
        const data = await response.json();
        setServerStatus(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch server status:', err);
        setError('Failed to fetch server status. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchServerStatus();
    
    // Refresh every 60 seconds
    const intervalId = setInterval(fetchServerStatus, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  if (loading) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg w-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent align-[-0.125em]"></div>
          <p className="mt-2">加载中...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg w-full">
        <p className="text-red-500">加载失败</p>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-900 p-6 rounded-lg w-full relative">
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold">服务器状态</h3>
        <div className={`ml-3 h-3 w-3 rounded-full ${serverStatus?.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
      </div>
      
      {serverStatus?.icon && (
        <div className="absolute top-6 right-6 w-16 h-16">
          <img 
            src={serverStatus.icon} 
            alt="Server Icon" 
            className="w-full h-full rounded-md" 
          />
        </div>
      )}
      
      {serverStatus?.online ? (
        <div className="space-y-2">
          <p>
            <span className="font-semibold">地址:</span> mcpebot.com:20016
          </p>
          {serverStatus.version && (
            <p>
              <span className="font-semibold">版本:</span> {serverStatus.version}
            </p>
          )}
          {serverStatus.players && (
            <p>
              <span className="font-semibold">玩家:</span> {serverStatus.players.online}/{serverStatus.players.max}
            </p>
          )}
          {serverStatus.motd && (
            <div>
              <span className="font-semibold">描述:</span>
              {serverStatus.motd.html && serverStatus.motd.html.length > 0 ? (
                <div className="ml-2 mt-1 minecraft-motd">
                  {serverStatus.motd.html.map((line, index) => (
                    <div 
                      key={index} 
                      dangerouslySetInnerHTML={{ __html: line }}
                      className="minecraft-motd-line"
                    />
                  ))}
                </div>
              ) : serverStatus.motd.clean && serverStatus.motd.clean.length > 0 ? (
                <div className="ml-2 mt-1">
                  {serverStatus.motd.clean.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              ) : null}
            </div>
          )}
          {serverStatus.players?.list && serverStatus.players.list.length > 0 && (
            <div>
              <span className="font-semibold">在线:</span>
              <div className="ml-2 mt-1 flex flex-wrap gap-2">
                {serverStatus.players.list.map(player => (
                  <span key={player.uuid} className="bg-gray-800 px-2 py-1 rounded text-sm">
                    {player.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-red-400">离线</p>
      )}
    </div>
  );
}
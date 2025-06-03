import { NextResponse } from 'next/server';

// 缓存相关变量
let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30秒缓存

export async function GET() {
  try {
    const now = Date.now();
    
    // 如果缓存有效，直接返回缓存数据
    if (cachedData && now - lastFetchTime < CACHE_DURATION) {
      return NextResponse.json(cachedData);
    }
    
    // 服务器地址
    const serverAddress = 'mcpebot.com:20016';
    
    // 调用mcsrvstat.us API获取服务器状态
    const response = await fetch(`https://api.mcsrvstat.us/3/${serverAddress}`, {
      headers: {
        'User-Agent': 'MinecraftStatusChecker/1.0 (Next.js Web Application)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 更新缓存
    cachedData = data;
    lastFetchTime = now;
    
    // 返回服务器状态数据
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Minecraft server status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch server status' },
      { status: 500 }
    );
  }
} 
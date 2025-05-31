import { NextResponse } from 'next/server';

export async function GET() {
  try {
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
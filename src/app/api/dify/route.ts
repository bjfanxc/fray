import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  let query: string = ''
  
  try {
    const body = await request.json()
    query = body.query

    if (!query) {
      return NextResponse.json(
        { error: '请提供要反击的话语' },
        { status: 400 }
      )
    }

    // 获取环境变量
    const difyApiUrl = process.env.DIFY_API_URL || 'https://api.dify.ai/v1'
    const difyApiKey = process.env.DIFY_API_KEY

    // 调试信息
    console.log('环境变量调试信息:')
    console.log('DIFY_API_URL:', difyApiUrl)
    console.log('DIFY_API_KEY 是否存在:', !!difyApiKey)
    console.log('DIFY_API_KEY 长度:', difyApiKey ? difyApiKey.length : 0)

    if (!difyApiKey) {
      console.warn('DIFY_API_KEY 未设置，使用模拟响应')
      // 如果没有配置 API Key，返回模拟响应
      return getSimulatedResponse(query)
    }

    // 调用真实的 Dify API
    const response = await fetch(`${difyApiUrl}/chat-messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${difyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          query: `"${query}"`
        },
        query: `请帮我反击这个观点："${query}"`,
        response_mode: 'blocking',
        user: `user-${Date.now()}`,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Dify API 错误详情:`, {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      throw new Error(`Dify API 错误: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    
    return NextResponse.json({
      answer: data.answer || '生成反击话术失败',
      conversation_id: data.conversation_id,
    })

  } catch (error) {
    console.error('Dify API 调用失败:', error)
    
    // 如果 API 调用失败，返回模拟响应作为备选
    // 使用已经解析的 query，而不是再次读取请求体
    return getSimulatedResponse(query || '未知观点')
  }
}

// 模拟响应函数
function getSimulatedResponse(query: string) {
  const responses = [
    `针对"${query}"，我的回应是：这种观点过于片面，让我们从更全面的角度来看待这个问题。首先，我们需要考虑到...`,
    `关于"${query}"，我认为你可能忽略了一个重要的事实：根据最新的研究数据显示，实际情况恰恰相反...`,
    `你说"${query}"，但这恰恰证明了我的观点。让我用逻辑来分析一下：第一，这个假设的前提本身就存在问题...`,
    `"${query}"这个说法很有趣，不过我想分享一个不同的视角。从历史经验来看...`,
    `我理解你的观点"${query}"，但是让我们看看专家是怎么说的。根据权威机构的报告...`,
    `对于"${query}"这个观点，我想提出几个反思的角度：首先，我们是否考虑了所有相关因素？其次...`
  ]
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)]
  
  return NextResponse.json({
    answer: randomResponse,
    conversation_id: `mock-${Date.now()}`,
    note: '这是模拟响应，请配置 DIFY_API_KEY 以使用真实 API'
  })
} 
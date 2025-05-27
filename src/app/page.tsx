"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Zap, MessageSquare, Lightbulb, Target } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// 动态加载文字组件
function LoadingText() {
  const [textIndex, setTextIndex] = useState(0)
  
  const loadingTexts = [
    "🧠 分析对方观点的逻辑漏洞...",
    "📚 查找相关论据和数据...",
    "⚡ 构建有力的反击论点...",
    "🎯 优化表达方式和语气...",
    "✨ 完善最终反击策略..."
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <p className="text-blue-700 text-sm animate-fade-in">
      {loadingTexts[textIndex]}
    </p>
  )
}

export default function Home() {
  const [inputText, setInputText] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleCounterAttack = async () => {
    if (!inputText.trim()) {
      alert("请输入对方的话语")
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/dify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: inputText
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResponse(data.answer || '生成反击话术失败')
      
      // 如果是模拟响应，显示提示
      if (data.note) {
        console.log(data.note)
      }
    } catch (error) {
      console.error("API 调用失败:", error)
      setResponse("抱歉，反击生成失败，请稍后重试。")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 标题区域 */}
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Zap className="text-yellow-500" />
            吵架必赢
            <Target className="text-red-500" />
          </h1>
          <p className="text-xl text-gray-600">
            智能反击助手，让你在每次争论中都能占据上风
          </p>
        </div>

        {/* 使用提示 */}
        <Alert className="bg-blue-50 border-blue-200">
          <Lightbulb className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">使用提示</AlertTitle>
          <AlertDescription className="text-blue-700">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>在下方输入框中输入对方的话语或观点</li>
              <li>点击"反击"按钮，AI 将为你生成有力的反驳论据</li>
              <li>生成的反击话术会考虑逻辑性、说服力和礼貌性</li>
              <li>建议结合具体情况灵活运用，保持理性讨论</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* 主要功能区域 */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              输入对方话语
            </CardTitle>
            <CardDescription>
              请输入你想要反击的话语或观点，我们将为你生成有力的回应
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="例如：你这个想法完全不现实..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCounterAttack()
                  }
                }}
              />
              <Button 
                onClick={handleCounterAttack}
                disabled={isLoading}
                className="px-8"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>生成中...</span>
                  </div>
                ) : (
                  "反击"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 加载状态 */}
        {isLoading && (
          <Card className="shadow-lg border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <div className="animate-pulse">
                  <Zap className="h-5 w-5" />
                </div>
                AI 正在思考中...
              </CardTitle>
              <CardDescription className="text-blue-600">
                正在为您生成最佳反击策略，请稍候
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-lg border border-blue-200">
                <div className="flex flex-col items-center space-y-4">
                  {/* 动态加载动画 */}
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  
                  {/* 动态提示文字 */}
                  <div className="text-center">
                    <LoadingText />
                  </div>
                  
                  {/* 进度条动画 */}
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 结果展示区域 */}
        {response && !isLoading && (
          <Card className="shadow-lg border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI 反击话术
              </CardTitle>
              <CardDescription className="text-green-600">
                以下是为你生成的反击内容，请根据实际情况灵活运用
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="text-gray-800 leading-relaxed prose prose-sm max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // 自定义样式
                      h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-2 text-gray-900" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-lg font-semibold mb-2 text-gray-800" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-base font-medium mb-1 text-gray-700" {...props} />,
                      p: ({node, ...props}) => <p className="mb-2 text-gray-800" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="text-gray-800" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                      em: ({node, ...props}) => <em className="italic text-gray-700" {...props} />,
                      code: ({node, ...props}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800" {...props} />,
                      pre: ({node, ...props}) => <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto mb-2" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-2" {...props} />,
                    }}
                  >
                    {response}
                  </ReactMarkdown>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 底部说明 */}
        <div className="text-center text-sm text-gray-500 pb-8">
          <p>本工具仅供学习交流使用，请理性讨论，避免恶意争吵</p>
          <p className="mt-1">Powered by Dify AI & Next.js</p>
        </div>
      </div>
    </div>
  )
} 
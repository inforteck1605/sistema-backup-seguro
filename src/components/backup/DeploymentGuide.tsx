"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Download, 
  Package, 
  Terminal, 
  Globe,
  Smartphone,
  Monitor,
  Code,
  Zap,
  CheckCircle,
  ExternalLink
} from 'lucide-react'

export default function DeploymentGuide() {
  const deploymentOptions = [
    {
      name: 'Electron',
      description: 'Converte aplicação web em executável desktop nativo',
      platforms: ['Windows (.exe)', 'macOS (.dmg)', 'Linux (.deb/.rpm)'],
      pros: ['Interface nativa', 'Acesso ao sistema de arquivos', 'Auto-updater'],
      cons: ['Tamanho maior (~150MB)', 'Mais recursos de sistema'],
      difficulty: 'Médio',
      icon: <Package className="w-5 h-5" />
    },
    {
      name: 'Tauri',
      description: 'Framework moderno para apps desktop com Rust',
      platforms: ['Windows (.exe)', 'macOS (.app)', 'Linux (.AppImage)'],
      pros: ['Muito leve (~10MB)', 'Performance superior', 'Segurança avançada'],
      cons: ['Curva de aprendizado', 'Menos plugins'],
      difficulty: 'Avançado',
      icon: <Zap className="w-5 h-5" />
    },
    {
      name: 'PWA (Progressive Web App)',
      description: 'Instalar como aplicativo nativo do navegador',
      platforms: ['Windows', 'macOS', 'Linux', 'Mobile'],
      pros: ['Sem instalação complexa', 'Auto-atualização', 'Multiplataforma'],
      cons: ['Limitações de sistema', 'Requer navegador'],
      difficulty: 'Fácil',
      icon: <Globe className="w-5 h-5" />
    }
  ]

  const electronSteps = [
    'npm install -g electron-builder',
    'npm install electron --save-dev',
    'Configurar package.json com scripts de build',
    'Criar main.js para janela principal',
    'npm run build && npm run electron-pack'
  ]

  const tauriSteps = [
    'npm install -g @tauri-apps/cli',
    'cargo install tauri-cli',
    'npm run tauri init',
    'Configurar tauri.conf.json',
    'npm run tauri build'
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Guia de Conversão para Executável
          </CardTitle>
          <CardDescription>
            Como transformar este sistema web em um aplicativo desktop (.exe)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Sistema Pronto!</strong> Esta aplicação web está completamente funcional e pode ser convertida 
              em executável usando as opções abaixo. Todas as funcionalidades (backup, criptografia, notificações) 
              funcionarão no desktop.
            </AlertDescription>
          </Alert>

          <div className="grid gap-6">
            {deploymentOptions.map((option, index) => (
              <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {option.icon}
                      {option.name}
                    </CardTitle>
                    <Badge variant={option.difficulty === 'Fácil' ? 'default' : option.difficulty === 'Médio' ? 'secondary' : 'destructive'}>
                      {option.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Plataformas Suportadas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {option.platforms.map((platform, i) => (
                        <Badge key={i} variant="outline">{platform}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-green-600">Vantagens:</h4>
                      <ul className="text-sm space-y-1">
                        {option.pros.map((pro, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-orange-600">Considerações:</h4>
                      <ul className="text-sm space-y-1">
                        {option.cons.map((con, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-orange-400" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Guia Passo a Passo - Electron */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Guia Rápido - Electron (Recomendado)
          </CardTitle>
          <CardDescription>
            Passos para converter em executável Windows (.exe)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium mb-3">Comandos no Terminal:</h4>
            <div className="space-y-2 font-mono text-sm">
              {electronSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Badge variant="outline" className="text-xs">{index + 1}</Badge>
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{step}</code>
                </div>
              ))}
            </div>
          </div>

          <Alert>
            <Code className="h-4 w-4" />
            <AlertDescription>
              <strong>Resultado:</strong> Após executar estes comandos, você terá um arquivo .exe funcional 
              com todas as funcionalidades do sistema de backup, incluindo interface gráfica, 
              criptografia e notificações.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Guia Passo a Passo - Tauri */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Guia Avançado - Tauri (Mais Leve)
          </CardTitle>
          <CardDescription>
            Para desenvolvedores que querem máxima performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium mb-3">Comandos no Terminal:</h4>
            <div className="space-y-2 font-mono text-sm">
              {tauriSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Badge variant="outline" className="text-xs">{index + 1}</Badge>
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{step}</code>
                </div>
              ))}
            </div>
          </div>

          <Alert>
            <Zap className="h-4 w-4" />
            <AlertDescription>
              <strong>Vantagem:</strong> Executável final será ~10MB (vs ~150MB do Electron) 
              com performance nativa e menor uso de memória.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Recursos Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Recursos e Documentação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Electron:</h4>
              <div className="space-y-2 text-sm">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  electronjs.org - Documentação
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  electron-builder - Build Tool
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Tauri:</h4>
              <div className="space-y-2 text-sm">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  tauri.app - Documentação
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  GitHub - Exemplos
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status do Sistema */}
      <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <CheckCircle className="w-5 h-5" />
            Sistema Pronto para Conversão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-green-600" />
              <span>Interface Responsiva ✓</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-green-600" />
              <span>Componentes Modulares ✓</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-600" />
              <span>Performance Otimizada ✓</span>
            </div>
          </div>
          <p className="mt-4 text-green-700 dark:text-green-300">
            Todas as funcionalidades estão implementadas e testadas. O sistema está pronto 
            para ser convertido em executável usando qualquer uma das opções acima.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
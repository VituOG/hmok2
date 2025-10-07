// Mascot Wanderer System - PulseCat
class MascotWanderer {
    constructor() {
        this.mascot = null;
        this.currentPosition = 'bottom-left';
        this.isVisible = false;
        this.curiosityIndex = 0;
        this.wanderInterval = null;
        this.curiosityInterval = null;
        this.positions = [
            'bottom-left', 'bottom-right', 'top-left', 'top-right',
            'center-left', 'center-right', 'middle-top', 'middle-bottom'
        ];
        
        this.curiosities = [
            "💡 Sabia que limpar arquivos temporários pode liberar até 2GB de espaço?",
            "⚡ Desfragmentar o disco pode acelerar o Windows em até 30%!",
            "🛡️ O Windows Defender é gratuito e muito eficaz contra vírus!",
            "🧹 O cache do navegador pode ocupar vários GB sem você saber!",
            "🚀 Desabilitar programas de inicialização acelera o boot em 50%!",
            "💾 Um SSD é 10x mais rápido que um HD tradicional!",
            "🔧 Atualizar drivers pode resolver problemas de performance!",
            "📊 O Task Manager mostra quais programas consomem mais RAM!",
            "🌐 Limpar o DNS pode resolver problemas de conexão!",
            "⚙️ O Windows tem ferramentas nativas de otimização!",
            "🎯 Desabilitar efeitos visuais libera recursos do sistema!",
            "💻 Reiniciar o PC resolve 90% dos problemas temporários!",
            "🔍 O Windows Search Indexer pode ser otimizado!",
            "📱 Aplicativos em segundo plano consomem bateria e RAM!",
            "🎨 Temas escuros economizam energia em telas OLED!",
            "🔄 O Windows Update pode melhorar a performance!",
            "📈 Monitorar a temperatura evita throttling do processador!",
            "🎮 Modo Jogo do Windows otimiza recursos para games!",
            "🔐 Antivírus em tempo real pode impactar a performance!",
            "💡 O Windows 11 tem otimizações automáticas de energia!"
        ];
        
        this.pageCuriosities = {
            'index': [
                "🏠 Esta é a página principal do PulseX!",
                "✨ Aqui você encontra tudo sobre otimização!",
                "🚀 Bem-vindo ao futuro da performance!"
            ],
            'features': [
                "🔧 Aqui estão todos os recursos do PulseX!",
                "⚡ Cada recurso foi pensado para máxima eficiência!",
                "🛡️ Proteção e performance em um só lugar!"
            ],
            'download': [
                "📥 Baixe a versão mais recente aqui!",
                "💾 O download é rápido e seguro!",
                "🎯 Instalação em menos de 2 minutos!"
            ],
            'pricing': [
                "💰 Encontre o plano perfeito para você!",
                "💎 O plano Pro oferece recursos avançados!",
                "🏢 Empresas escolhem o plano Enterprise!"
            ],
            'support': [
                "🆘 Precisa de ajuda? Estamos aqui!",
                "💬 Nossa equipe responde em até 24h!",
                "📚 Base de conhecimento sempre atualizada!"
            ],
            'login': [
                "🔐 Acesse sua conta PulseX aqui!",
                "👤 Suas configurações estão seguras!",
                "⚙️ Personalize sua experiência!"
            ]
        };
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createMascot());
        } else {
            this.createMascot();
        }
    }
    
    createMascot() {
        // Remove existing mascot if any
        const existingMascot = document.getElementById('mascot');
        if (existingMascot) {
            existingMascot.remove();
        }
        
        // Create mascot HTML
        const mascotHTML = `
            <div id="mascot" class="mascot-wanderer">
                <div class="mascot-glow"></div>
                <div class="mascot-body">
                    <div class="mascot-wings">
                        <div class="wing left-wing">
                            <div class="wing-feather"></div>
                            <div class="wing-feather"></div>
                            <div class="wing-feather"></div>
                        </div>
                        <div class="wing right-wing">
                            <div class="wing-feather"></div>
                            <div class="wing-feather"></div>
                            <div class="wing-feather"></div>
                        </div>
                    </div>
                    <div class="mascot-head">
                        <div class="mascot-ears">
                            <div class="ear left">
                                <div class="ear-inner"></div>
                            </div>
                            <div class="ear right">
                                <div class="ear-inner"></div>
                            </div>
                        </div>
                        <div class="mascot-face">
                        <div class="mascot-eyes">
                            <div class="eye left">
                                <div class="pupil"></div>
                                <div class="eye-highlight"></div>
                            </div>
                            <div class="eye right">
                                <div class="pupil"></div>
                                <div class="eye-highlight"></div>
                            </div>
                            <div class="peek-paws">
                                <div class="peek-paw left"></div>
                                <div class="peek-paw right"></div>
                            </div>
                        </div>
                            <div class="mascot-star"></div>
                            <div class="mascot-mouth">
                                <div class="tongue"></div>
                            </div>
                        </div>
                    </div>
                    <div class="mascot-paws">
                        <div class="paw left-paw"></div>
                        <div class="paw right-paw"></div>
                    </div>
                </div>
                <div class="mascot-speech-bubble" id="mascot-speech">
                    <div class="speech-content">
                        <span class="speech-text" id="speech-text">Oi! Eu sou o PulseCat! ✨</span>
                    </div>
                    <div class="speech-arrow"></div>
                </div>
            </div>
        `;
        
        // Add to page
        document.body.insertAdjacentHTML('beforeend', mascotHTML);
        this.mascot = document.getElementById('mascot');
        
        // Add CSS if not already present
        this.addMascotCSS();
        
        // Set initial position
        this.setRandomPosition();
        
        // Add event listeners
        this.addEventListeners();
        
        // Start wandering
        this.startWandering();
        
        // Show initial message
        setTimeout(() => {
            this.showPageCuriosity();
        }, 2000);
    }
    
    addMascotCSS() {
        if (document.getElementById('mascot-wanderer-css')) return;
        
        const css = `
            <style id="mascot-wanderer-css">
                /* Mascot Wanderer Styles */
                .mascot-wanderer {
                    position: fixed;
                    width: 100px;
                    height: 100px;
                    z-index: 9995;
                    cursor: pointer;
                    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                    opacity: 0;
                    transform: translateY(20px) scale(0.8);
                    animation: mascotAppear 1.5s ease-out 1s forwards;
                }
                
                .mascot-wanderer:hover {
                    transform: scale(1.1) !important;
                }
                
                @keyframes mascotAppear {
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                /* Position classes */
                .mascot-wanderer.bottom-left {
                    bottom: 100px;
                    left: 50px;
                }
                
                .mascot-wanderer.bottom-right {
                    bottom: 100px;
                    right: 50px;
                }
                
                .mascot-wanderer.top-left {
                    top: 100px;
                    left: 50px;
                }
                
                .mascot-wanderer.top-right {
                    top: 100px;
                    right: 50px;
                }
                
                .mascot-wanderer.center-left {
                    top: 50%;
                    left: 30px;
                    transform: translateY(-50%);
                }
                
                .mascot-wanderer.center-right {
                    top: 50%;
                    right: 30px;
                    transform: translateY(-50%);
                }
                
                .mascot-wanderer.middle-top {
                    top: 30%;
                    left: 50%;
                    transform: translateX(-50%);
                }
                
                .mascot-wanderer.middle-bottom {
                    bottom: 30%;
                    left: 50%;
                    transform: translateX(-50%);
                }
                
                .mascot-glow {
                    position: absolute;
                    top: -25px;
                    left: -25px;
                    right: -25px;
                    bottom: -25px;
                    background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(168, 85, 247, 0.3) 40%, rgba(236, 72, 153, 0.2) 70%, transparent 90%);
                    border-radius: 50%;
                    animation: mascotGlow 3s ease-in-out infinite;
                    z-index: -1;
                }
                
                @keyframes mascotGlow {
                    0%, 100% { 
                        opacity: 0.6;
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 1;
                        transform: scale(1.1);
                    }
                }
                
                .mascot-body {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 30%, #c084fc 70%, #e879f9 100%);
                    border-radius: 50%;
                    box-shadow: 
                        0 12px 40px rgba(139, 92, 246, 0.6),
                        inset 0 3px 12px rgba(255, 255, 255, 0.3),
                        0 0 60px rgba(139, 92, 246, 0.4);
                    animation: mascotFloat 4s ease-in-out infinite;
                }
                
                @keyframes mascotFloat {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(3deg); }
                }
                
                /* Wings */
                .mascot-wings {
                    position: absolute;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80px;
                    height: 40px;
                    z-index: 1;
                }
                
                .wing {
                    position: absolute;
                    width: 35px;
                    height: 40px;
                }
                
                .left-wing {
                    left: 0;
                    animation: wingFlap 2s ease-in-out infinite;
                }
                
                .right-wing {
                    right: 0;
                    animation: wingFlap 2s ease-in-out infinite reverse;
                }
                
                @keyframes wingFlap {
                    0%, 100% { transform: rotateY(0deg); }
                    50% { transform: rotateY(15deg); }
                }
                
                .wing-feather {
                    position: absolute;
                    width: 16px;
                    height: 24px;
                    background: linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #f8fafc 100%);
                    border-radius: 50% 50% 0 0;
                    box-shadow: 
                        0 0 15px rgba(255, 255, 255, 0.9),
                        0 0 30px rgba(255, 255, 255, 0.6),
                        inset 0 2px 4px rgba(255, 255, 255, 0.8);
                }
                
                .left-wing .wing-feather:nth-child(1) {
                    top: 5px;
                    left: 5px;
                    transform: rotate(-20deg);
                }
                
                .left-wing .wing-feather:nth-child(2) {
                    top: 10px;
                    left: 12px;
                    transform: rotate(-10deg);
                }
                
                .left-wing .wing-feather:nth-child(3) {
                    top: 15px;
                    left: 19px;
                    transform: rotate(0deg);
                }
                
                .right-wing .wing-feather:nth-child(1) {
                    top: 5px;
                    right: 5px;
                    transform: rotate(20deg);
                }
                
                .right-wing .wing-feather:nth-child(2) {
                    top: 10px;
                    right: 12px;
                    transform: rotate(10deg);
                }
                
                .right-wing .wing-feather:nth-child(3) {
                    top: 15px;
                    right: 19px;
                    transform: rotate(0deg);
                }
                
                /* Head */
                .mascot-head {
                    position: absolute;
                    top: 15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 85px;
                    height: 85px;
                    background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 30%, #c084fc 70%, #e879f9 100%);
                    border-radius: 50%;
                    box-shadow: 
                        0 8px 30px rgba(139, 92, 246, 0.6),
                        inset 0 3px 8px rgba(255, 255, 255, 0.4),
                        0 0 40px rgba(139, 92, 246, 0.5);
                }
                
                /* Ears */
                .mascot-ears {
                    position: absolute;
                    top: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    height: 25px;
                }
                
                .ear {
                    position: absolute;
                    width: 22px;
                    height: 32px;
                    background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 30%, #c084fc 70%, #e879f9 100%);
                    border-radius: 50% 50% 0 0;
                    top: -5px;
                    box-shadow: 
                        0 3px 12px rgba(139, 92, 246, 0.5),
                        inset 0 2px 4px rgba(255, 255, 255, 0.3);
                }
                
                .ear.left {
                    left: 10px;
                    transform: rotate(-25deg);
                }
                
                .ear.right {
                    right: 10px;
                    transform: rotate(25deg);
                }
                
                .ear-inner {
                    position: absolute;
                    width: 12px;
                    height: 16px;
                    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #ea580c 70%, #dc2626 100%);
                    border-radius: 50%;
                    top: 6px;
                    left: 50%;
                    transform: translateX(-50%);
                    box-shadow: 
                        0 0 20px rgba(251, 191, 36, 1),
                        0 0 40px rgba(251, 191, 36, 0.8),
                        0 0 60px rgba(251, 191, 36, 0.6),
                        inset 0 2px 4px rgba(255, 255, 255, 0.6);
                }
                
                /* Face */
                .mascot-face {
                    position: absolute;
                    top: 8px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 65px;
                    height: 55px;
                    background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
                    border-radius: 50%;
                    box-shadow: 
                        0 0 15px rgba(255, 255, 255, 0.8),
                        inset 0 2px 6px rgba(255, 255, 255, 0.6);
                }
                
                /* Eyes */
                .mascot-eyes {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 6px 0;
                    position: relative;
                }
                
                .eye {
                    width: 18px;
                    height: 18px;
                    background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
                    border-radius: 50%;
                    position: relative;
                    animation: mascotBlink 4s infinite;
                    box-shadow: 
                        0 0 8px rgba(59, 130, 246, 0.6),
                        inset 0 1px 3px rgba(255, 255, 255, 0.4);
                }
                
                /* Peek-a-boo paws */
                .peek-paws {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10;
                    animation: peekABoo 8s ease-in-out infinite;
                }
                
                .peek-paw {
                    position: absolute;
                    width: 18px;
                    height: 18px;
                    background: linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #f8fafc 100%);
                    border-radius: 50%;
                    box-shadow: 
                        0 0 12px rgba(255, 255, 255, 0.9),
                        0 0 24px rgba(255, 255, 255, 0.6),
                        inset 0 2px 4px rgba(255, 255, 255, 0.8);
                }
                
                .peek-paw.left {
                    top: 2px;
                    left: 8px;
                    transform: rotate(-15deg);
                }
                
                .peek-paw.right {
                    top: 2px;
                    right: 8px;
                    transform: rotate(15deg);
                }
                
                @keyframes peekABoo {
                    0%, 80% { 
                        opacity: 1;
                        transform: translateY(0px);
                    }
                    85%, 95% { 
                        opacity: 0;
                        transform: translateY(-5px);
                    }
                }
                
                @keyframes mascotBlink {
                    0%, 90%, 100% { transform: scaleY(1); }
                    95% { transform: scaleY(0.1); }
                }
                
                .pupil {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation: mascotLook 6s infinite;
                    box-shadow: 
                        0 0 4px rgba(30, 27, 75, 0.8),
                        inset 0 1px 2px rgba(255, 255, 255, 0.2);
                }
                
                @keyframes mascotLook {
                    0%, 80%, 100% { transform: translate(-50%, -50%); }
                    10%, 30% { transform: translate(-25%, -50%); }
                    20%, 40% { transform: translate(-75%, -50%); }
                    50%, 70% { transform: translate(-50%, -25%); }
                    60% { transform: translate(-50%, -75%); }
                }
                
                .eye-highlight {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
                    border-radius: 50%;
                    top: 2px;
                    left: 3px;
                    box-shadow: 
                        0 0 4px rgba(255, 255, 255, 0.8),
                        0 0 8px rgba(255, 255, 255, 0.6);
                }
                
                /* Star */
                .mascot-star {
                    position: absolute;
                    top: 4px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 18px;
                    height: 18px;
                    background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 50%, #f59e0b 100%);
                    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                    animation: starTwinkle 2s ease-in-out infinite;
                    box-shadow: 
                        0 0 20px rgba(251, 191, 36, 1),
                        0 0 40px rgba(251, 191, 36, 0.9),
                        0 0 60px rgba(251, 191, 36, 0.7),
                        0 0 80px rgba(251, 191, 36, 0.5);
                }
                
                @keyframes starTwinkle {
                    0%, 100% { 
                        opacity: 1;
                        transform: translateX(-50%) scale(1);
                    }
                    50% { 
                        opacity: 0.7;
                        transform: translateX(-50%) scale(1.1);
                    }
                }
                
                .mascot-star::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 2px;
                    height: 2px;
                    background: #1f2937;
                    border-radius: 50%;
                }
                
                /* Mouth */
                .mascot-mouth {
                    position: absolute;
                    bottom: 8px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 10px;
                    border: 2px solid #1f2937;
                    border-top: none;
                    border-radius: 0 0 20px 20px;
                    box-shadow: 0 2px 6px rgba(31, 41, 55, 0.4);
                }
                
                .tongue {
                    position: absolute;
                    bottom: -2px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 8px;
                    height: 5px;
                    background: linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%);
                    border-radius: 50%;
                    box-shadow: 
                        0 2px 4px rgba(236, 72, 153, 0.5),
                        0 0 8px rgba(236, 72, 153, 0.3);
                }
                
                /* Paws */
                .mascot-paws {
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 60px;
                    height: 20px;
                }
                
                .paw {
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    background: linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #f8fafc 100%);
                    border-radius: 50%;
                    box-shadow: 
                        0 0 12px rgba(255, 255, 255, 0.9),
                        0 0 24px rgba(255, 255, 255, 0.6),
                        inset 0 2px 4px rgba(255, 255, 255, 0.8);
                }
                
                .left-paw {
                    left: 15px;
                    animation: pawMove 3s ease-in-out infinite;
                }
                
                .right-paw {
                    right: 15px;
                    animation: pawMove 3s ease-in-out infinite reverse;
                }
                
                @keyframes pawMove {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                }
                
                /* Speech Bubble */
                .mascot-speech-bubble {
                    position: absolute;
                    bottom: 120%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%);
                    backdrop-filter: blur(20px);
                    border: 2px solid rgba(139, 92, 246, 0.4);
                    border-radius: 20px;
                    padding: 12px 16px;
                    margin-bottom: 15px;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 
                        0 12px 40px rgba(139, 92, 246, 0.2),
                        0 4px 16px rgba(0, 0, 0, 0.1);
                    min-width: 150px;
                    max-width: 280px;
                    text-align: center;
                }
                
                .mascot-speech-bubble.show {
                    opacity: 1;
                    visibility: visible;
                }
                
                .speech-content {
                    position: relative;
                }
                
                .speech-text {
                    font-size: 15px;
                    font-weight: 600;
                    color: #4c1d95;
                    line-height: 1.5;
                    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
                }
                
                .speech-arrow {
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-top: 10px solid rgba(255, 255, 255, 0.98);
                    filter: drop-shadow(0 2px 4px rgba(139, 92, 246, 0.2));
                }
                
                .speech-arrow::before {
                    content: '';
                    position: absolute;
                    bottom: 1px;
                    left: -9px;
                    width: 0;
                    height: 0;
                    border-left: 9px solid transparent;
                    border-right: 9px solid transparent;
                    border-top: 9px solid rgba(139, 92, 246, 0.3);
                }
                
                /* Mascot interactions */
                .mascot-wanderer.clicked {
                    animation: mascotHappy 0.8s ease-in-out;
                }
                
                @keyframes mascotHappy {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    25% { transform: scale(1.15) rotate(-8deg); }
                    75% { transform: scale(1.15) rotate(8deg); }
                }
                
                /* Responsividade */
                @media (max-width: 768px) {
                    .mascot-wanderer {
                        width: 80px;
                        height: 80px;
                    }
                    
                    .mascot-wanderer.bottom-left,
                    .mascot-wanderer.bottom-right {
                        bottom: 80px;
                    }
                    
                    .mascot-wanderer.bottom-left {
                        left: 20px;
                    }
                    
                    .mascot-wanderer.bottom-right {
                        right: 20px;
                    }
                    
                    .mascot-wanderer.top-left,
                    .mascot-wanderer.top-right {
                        top: 80px;
                    }
                    
                    .mascot-wanderer.top-left {
                        left: 20px;
                    }
                    
                    .mascot-wanderer.top-right {
                        right: 20px;
                    }
                    
                    .mascot-wanderer.center-left {
                        left: 15px;
                    }
                    
                    .mascot-wanderer.center-right {
                        right: 15px;
                    }
                    
                    .mascot-head {
                        width: 56px;
                        height: 48px;
                    }
                    
                    .mascot-face {
                        width: 40px;
                        height: 32px;
                    }
                    
                    .mascot-speech-bubble {
                        min-width: 120px;
                        max-width: 200px;
                        font-size: 12px;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', css);
    }
    
    addEventListeners() {
        if (!this.mascot) return;
        
        // Click interaction
        this.mascot.addEventListener('click', () => this.handleClick());
        
        // Hover effects
        this.mascot.addEventListener('mouseenter', () => this.handleHover());
        this.mascot.addEventListener('mouseleave', () => this.handleHoverLeave());
    }
    
    setRandomPosition() {
        if (!this.mascot) return;
        
        // Remove current position class
        this.positions.forEach(pos => {
            this.mascot.classList.remove(pos);
        });
        
        // Set new random position
        const newPosition = this.positions[Math.floor(Math.random() * this.positions.length)];
        this.mascot.classList.add(newPosition);
        this.currentPosition = newPosition;
    }
    
    startWandering() {
        // Wander every 15-30 seconds
        this.wanderInterval = setInterval(() => {
            this.wander();
        }, 15000 + Math.random() * 15000);
        
        // Show curiosities every 20-40 seconds
        this.curiosityInterval = setInterval(() => {
            this.showRandomCuriosity();
        }, 20000 + Math.random() * 20000);
    }
    
    wander() {
        if (!this.mascot) return;
        
        // Fade out
        this.mascot.style.opacity = '0';
        this.mascot.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            // Change position
            this.setRandomPosition();
            
            // Fade in
            this.mascot.style.opacity = '1';
            this.mascot.style.transform = 'scale(1)';
            
            // Show curiosity after wandering
            setTimeout(() => {
                this.showRandomCuriosity();
            }, 1000);
        }, 500);
    }
    
    showRandomCuriosity() {
        const randomCuriosity = this.curiosities[Math.floor(Math.random() * this.curiosities.length)];
        this.showMessage(randomCuriosity);
    }
    
    showPageCuriosity() {
        const currentPage = this.getCurrentPage();
        const pageCuriosities = this.pageCuriosities[currentPage] || this.curiosities;
        const randomCuriosity = pageCuriosities[Math.floor(Math.random() * pageCuriosities.length)];
        this.showMessage(randomCuriosity);
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('features')) return 'features';
        if (path.includes('download')) return 'download';
        if (path.includes('pricing')) return 'pricing';
        if (path.includes('support')) return 'support';
        if (path.includes('login')) return 'login';
        return 'index';
    }
    
    showMessage(message) {
        const speechBubble = document.getElementById('mascot-speech');
        const speechText = document.getElementById('speech-text');
        
        if (!speechBubble || !speechText) return;
        
        // Update message
        speechText.textContent = message;
        
        // Show bubble
        speechBubble.classList.add('show');
        
        // Hide after 4 seconds
        setTimeout(() => {
            speechBubble.classList.remove('show');
        }, 4000);
    }
    
    handleClick() {
        if (!this.mascot) return;
        
        // Add click animation
        this.mascot.classList.add('clicked');
        setTimeout(() => {
            this.mascot.classList.remove('clicked');
        }, 800);
        
        // Show random message
        const clickMessages = [
            "🐱 PulseCat está aqui para ajudar!",
            "✨ Clique em mim para mais curiosidades!",
            "🚀 Vamos otimizar seu PC juntos!",
            "💡 Eu sei de muitas dicas úteis!",
            "🎯 Performance máxima é meu objetivo!"
        ];
        
        const randomMessage = clickMessages[Math.floor(Math.random() * clickMessages.length)];
        this.showMessage(randomMessage);
        
        // Trigger toast if available
        if (typeof showSuccess === 'function') {
            showSuccess("PulseCat está feliz! 🐱✨", "Mascote");
        }
    }
    
    handleHover() {
        if (!this.mascot) return;
        this.mascot.style.transform = 'scale(1.1)';
    }
    
    handleHoverLeave() {
        if (!this.mascot) return;
        this.mascot.style.transform = 'scale(1)';
    }
    
    destroy() {
        if (this.wanderInterval) {
            clearInterval(this.wanderInterval);
        }
        if (this.curiosityInterval) {
            clearInterval(this.curiosityInterval);
        }
        if (this.mascot) {
            this.mascot.remove();
        }
    }
}

// Initialize mascot wanderer
window.mascotWanderer = new MascotWanderer();

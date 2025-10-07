import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  color?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  color = 'var(--neon-purple)'
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounter();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounter = () => {
    const startTime = performance.now();
    const startValue = 0;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = startValue + (end - startValue) * easeOutQuart;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toFixed(decimals);
  };

  return (
    <span
      ref={counterRef}
      className="counter"
      style={{
        fontFamily: "'Orbitron', monospace",
        fontWeight: '700',
        fontSize: '2rem',
        color: color,
        textShadow: `0 0 10px ${color}40`,
        transition: 'all 0.3s ease'
      }}
    >
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

interface StatCardProps {
  icon: string;
  title: string;
  value: number;
  suffix: string;
  description: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  suffix,
  description,
  color = 'var(--neon-purple)'
}) => {
  return (
    <div
      className="stat-card glass-card reveal"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: '20px',
        padding: '1.5rem',
        textAlign: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }}
        className="card-glow"
      ></div>

      <div
        style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.3))'
        }}
      >
        {icon}
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <AnimatedCounter
          end={value}
          suffix={suffix}
          color={color}
        />
      </div>

      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem'
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.4',
          margin: 0
        }}
      >
        {description}
      </p>

      <style jsx>{`
        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(168, 85, 247, 0.2);
        }
        
        .stat-card:hover .card-glow {
          opacity: 1;
        }
        
        .stat-card:hover {
          border-color: ${color}40;
        }
      `}</style>
    </div>
  );
};

const AnimatedCounters: React.FC = () => {
  const stats = [
    {
      icon: '📥',
      title: 'Downloads',
      value: 2000000,
      suffix: '+',
      description: 'Usuários confiam no PulseX',
      color: 'var(--neon-purple)'
    },
    {
      icon: '⚡',
      title: 'Velocidade',
      value: 40,
      suffix: '%',
      description: 'Melhoria média de performance',
      color: 'var(--neon-cyan)'
    },
    {
      icon: '🛡️',
      title: 'Segurança',
      value: 100,
      suffix: '%',
      description: 'Proteção garantida',
      color: 'var(--neon-green)'
    },
    {
      icon: '💾',
      title: 'Espaço Liberado',
      value: 15,
      suffix: 'GB',
      description: 'Média por usuário',
      color: 'var(--neon-pink)'
    }
  ];

  return (
    <section
      className="animated-stats-section"
      style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(56, 189, 248, 0.05) 100%)'
      }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div
          className="section-header"
          style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}
        >
          <h2
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: '2.5rem',
              fontWeight: '700',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem'
            }}
          >
            📊 Números que Impressionam
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}
          >
            Resultados reais de usuários que transformaram seus PCs com o PulseX
          </p>
        </div>

        <div
          className="stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              suffix={stat.suffix}
              description={stat.description}
              color={stat.color}
            />
          ))}
        </div>

        {/* Additional animated elements */}
        <div
          className="stats-cta"
          style={{
            textAlign: 'center',
            marginTop: '3rem'
          }}
        >
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem'
            }}
          >
            Junte-se a milhões de usuários que já otimizaram seus PCs
          </p>
          <button
            onClick={() => window.location.href = './download.html'}
            className="stats-cta-btn pulse-cta"
            style={{
              background: 'var(--gradient-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              padding: '16px 32px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>🚀</span>
            Baixar Gratuitamente
          </button>
        </div>
      </div>

      <style jsx>{`
        .stats-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(168, 85, 247, 0.3);
        }
        
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }
          
          .section-header h2 {
            font-size: 2rem;
          }
          
          .stats-cta-btn {
            padding: 12px 24px;
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default AnimatedCounters;

import React, { useState, useEffect } from 'react';

interface Metric {
  label: string;
  before: number;
  after: number;
  unit: string;
  icon: string;
}

const PerformanceSimulator: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentMetrics, setCurrentMetrics] = useState<Metric[]>([]);

  const metrics: Metric[] = [
    {
      label: 'Velocidade de Boot',
      before: 45,
      after: 12,
      unit: 's',
      icon: '⚡'
    },
    {
      label: 'Espaço Livre',
      before: 8.5,
      after: 23.2,
      unit: 'GB',
      icon: '💾'
    },
    {
      label: 'CPU Usage',
      before: 78,
      after: 32,
      unit: '%',
      icon: '🖥️'
    },
    {
      label: 'RAM Usage',
      before: 85,
      after: 45,
      unit: '%',
      icon: '🧠'
    },
    {
      label: 'Tempo de Resposta',
      before: 2.3,
      after: 0.8,
      unit: 's',
      icon: '🚀'
    }
  ];

  const runSimulation = () => {
    setIsAnimating(true);
    setShowResults(false);
    setCurrentMetrics([]);

    // Simulate scanning process
    setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < metrics.length) {
          setCurrentMetrics(prev => [...prev, metrics[index]]);
          index++;
        } else {
          clearInterval(interval);
          setShowResults(true);
          setIsAnimating(false);
        }
      }, 800);
    }, 1000);
  };

  const getImprovementPercentage = (before: number, after: number) => {
    const improvement = ((before - after) / before) * 100;
    return Math.round(improvement);
  };

  const getImprovementColor = (before: number, after: number) => {
    const improvement = getImprovementPercentage(before, after);
    if (improvement > 50) return '#10B981'; // Green
    if (improvement > 25) return '#3B82F6'; // Blue
    return '#F59E0B'; // Orange
  };

  return (
    <section className="performance-simulator glass-card" style={{
      background: 'var(--glass-bg)',
      backdropFilter: 'var(--glass-blur)',
      border: '1px solid var(--glass-border)',
      borderRadius: '24px',
      padding: '2rem',
      margin: '2rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="simulator-header" style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: '1.5rem',
          fontWeight: '700',
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          🎯 Simulador de Performance
        </h3>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          margin: '0'
        }}>
          Veja quanto seu PC pode melhorar com o PulseX
        </p>
      </div>

      {!isAnimating && !showResults && (
        <div className="simulator-start" style={{
          textAlign: 'center',
          padding: '2rem 0'
        }}>
          <button
            onClick={runSimulation}
            className="simulator-btn pulse-cta glass-btn"
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
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto'
            }}
          >
            <span>🚀</span>
            Iniciar Simulação
          </button>
        </div>
      )}

      {isAnimating && (
        <div className="simulator-scanning" style={{
          textAlign: 'center',
          padding: '2rem 0'
        }}>
          <div className="scanning-animation" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div className="spinner" style={{
              width: '24px',
              height: '24px',
              border: '3px solid var(--glass-border)',
              borderTop: '3px solid var(--neon-purple)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <span style={{
              color: 'var(--text-primary)',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Analisando sistema...
            </span>
          </div>
          <div className="scan-progress" style={{
            width: '100%',
            height: '8px',
            background: 'var(--glass-bg)',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div className="progress-bar" style={{
              height: '100%',
              background: 'var(--gradient-primary)',
              borderRadius: 'inherit',
              animation: 'scanProgress 4s ease-out forwards',
              boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)'
            }}></div>
          </div>
        </div>
      )}

      {currentMetrics.length > 0 && (
        <div className="simulator-results" style={{
          display: 'grid',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {currentMetrics.map((metric, index) => (
            <div
              key={index}
              className="metric-card reveal"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--glass-blur)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '1rem',
                transition: 'all 0.3s ease',
                animation: 'slideInUp 0.5s ease-out',
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="metric-header" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: '1.2rem' }}>{metric.icon}</span>
                <span style={{
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}>
                  {metric.label}
                </span>
              </div>
              
              <div className="metric-values" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div className="before-value" style={{
                  textAlign: 'center',
                  flex: '1'
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#EF4444',
                    marginBottom: '0.25rem'
                  }}>
                    {metric.before}{metric.unit}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Antes
                  </div>
                </div>

                <div className="arrow" style={{
                  fontSize: '1.5rem',
                  color: 'var(--neon-purple)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}>
                  →
                </div>

                <div className="after-value" style={{
                  textAlign: 'center',
                  flex: '1'
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: getImprovementColor(metric.before, metric.after),
                    marginBottom: '0.25rem'
                  }}>
                    {metric.after}{metric.unit}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Depois
                  </div>
                </div>
              </div>

              <div className="improvement" style={{
                textAlign: 'center',
                marginTop: '0.5rem'
              }}>
                <span style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  padding: '4px 12px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: getImprovementColor(metric.before, metric.after)
                }}>
                  +{getImprovementPercentage(metric.before, metric.after)}% melhoria
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showResults && (
        <div className="simulator-summary" style={{
          textAlign: 'center',
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'var(--glass-bg)',
          borderRadius: '16px',
          border: '1px solid var(--glass-border)'
        }}>
          <h4 style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            🎉 Resultados Impressionantes!
          </h4>
          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '1rem'
          }}>
            Seu PC pode ter uma melhoria média de <strong style={{ color: 'var(--neon-purple)' }}>65%</strong> em performance
          </p>
          <button
            onClick={() => window.location.href = './download.html'}
            className="cta-btn pulse-cta"
            style={{
              background: 'var(--gradient-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            🚀 Baixar PulseX Agora
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes scanProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .simulator-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(168, 85, 247, 0.3);
        }
        
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(168, 85, 247, 0.3);
        }
        
        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(168, 85, 247, 0.2);
        }
      `}</style>
    </section>
  );
};

export default PerformanceSimulator;
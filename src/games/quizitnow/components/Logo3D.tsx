import { motion } from 'framer-motion';

interface Logo3DProps {
  size?: number;
  className?: string;
}

const Logo3D = ({ size = 40, className = '' }: Logo3DProps) => {
  const scale = size / 40;
  
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size, perspective: '200px' }}
      animate={{ rotateY: [0, 360] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    >
      {/* Cube faces */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          width: size,
          height: size,
        }}
      >
        {/* Front face */}
        <div
          className="absolute rounded-lg flex items-center justify-center font-display font-black text-primary-foreground"
          style={{
            width: size,
            height: size,
            background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))',
            transform: `translateZ(${size / 2}px)`,
            fontSize: size * 0.5,
            boxShadow: '0 0 15px hsl(var(--primary) / 0.4)',
          }}
        >
          Q
        </div>
        {/* Back face */}
        <div
          className="absolute rounded-lg flex items-center justify-center font-display font-black text-primary-foreground"
          style={{
            width: size,
            height: size,
            background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))',
            transform: `translateZ(-${size / 2}px) rotateY(180deg)`,
            fontSize: size * 0.5,
          }}
        >
          !
        </div>
        {/* Right face */}
        <div
          className="absolute rounded-lg"
          style={{
            width: size,
            height: size,
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.8), hsl(var(--primary) / 0.5))',
            transform: `rotateY(90deg) translateZ(${size / 2}px)`,
          }}
        />
        {/* Left face */}
        <div
          className="absolute rounded-lg"
          style={{
            width: size,
            height: size,
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.9))',
            transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
          }}
        />
        {/* Top face */}
        <div
          className="absolute rounded-lg"
          style={{
            width: size,
            height: size,
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.9), hsl(var(--accent) / 0.7))',
            transform: `rotateX(90deg) translateZ(${size / 2}px)`,
          }}
        />
        {/* Bottom face */}
        <div
          className="absolute rounded-lg"
          style={{
            width: size,
            height: size,
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.6))',
            transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
          }}
        />
      </div>
    </motion.div>
  );
};

export default Logo3D;

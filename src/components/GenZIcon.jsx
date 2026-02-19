import { motion } from 'framer-motion';

const ClinicalIcon = ({ icon: Icon, color = "text-primary-400", className = "" }) => {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group overflow-hidden ${className}`}
        >
            <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Icon className={`relative z-10 transition-colors duration-300 ${color}`} size={24} strokeWidth={2} />
        </motion.div>
    );
};

export default ClinicalIcon;

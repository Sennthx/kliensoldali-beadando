const Badge = ({ text, color = 'primary' }) => {
    return <span className={`badge badge-${color}`}>{text}</span>;
  };
  
export default Badge;
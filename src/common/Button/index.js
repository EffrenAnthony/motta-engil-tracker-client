export const Button = ({ type, text, icon, ...props }) => {
  const styles =
    type == 'primary'
      ? 'bg-blue-500'
      : type == 'secondary'
      ? 'bg-green-300'
      : type == 'warning'
      ? 'bg-yellow-600 text-black'
      : type == 'danger'
      ? 'bg-red-500'
      : 'underline'
  return (
    <button
      {...props}
      className={`w-full px-2 py-1 rounded text-white relative ${styles}`}
    >
      {icon}
      {text}
    </button>
  )
}

export const Button = ({ type, text, icon, ...props }) => {
  const styles =
    type == 'primary'
      ? 'bg-blue-500 text-white'
      : type == 'secondary'
      ? 'bg-green-300 text-white'
      : type == 'warning'
      ? 'bg-yellow-600 text-black'
      : type == 'danger'
      ? 'bg-red-500 text-white'
      : 'underline text-blue-500'
  return (
    <button
      {...props}
      className={`w-full px-2 py-1 rounded  relative ${styles}`}
    >
      {icon}
      {text}
    </button>
  )
}

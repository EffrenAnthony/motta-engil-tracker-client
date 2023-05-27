export const Button = ({ type, text, icon, ...props }) => {
  const styles =
    type == 'primary' && !props.disabled
      ? 'bg-blue-500 text-white'
      : type == 'secondary' && !props.disabled
      ? 'bg-green-300 text-white'
      : type == 'warning' && !props.disabled
      ? 'bg-yellow-600 text-black'
      : type == 'danger' && !props.disabled
      ? 'bg-red-500 text-white'
      : props.disabled
      ? 'bg-gray-50 text-white'
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

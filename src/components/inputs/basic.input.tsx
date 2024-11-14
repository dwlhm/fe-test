export const BasicInput = ({
  name,
  label,
  className = "",
  type = "text",
  required = false,
  defaultValue = "",
}: {
  name: string;
  label: string;
  className?: string;
  defaultValue?: string;
  type?: "text" | "number" | "email" | "password" | "radio";
  required?: boolean;
}) => {
  return (
    <div className="flex gap-2 flex-col mb-2">
      <label className="text-sm ml-2">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className={`${className} bg-gray-100 py-2 px-3 rounded-xl`}
        required={required}
      />
    </div>
  );
};

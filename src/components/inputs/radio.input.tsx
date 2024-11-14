export const RadioInput = ({
  name,
  label,
  className = "",
  data,
  required,
}: {
  name: string;
  label: string;
  data: string[];
  className?: string;
  required?: boolean;
}) => {
  return (
    <div className="flex gap-2 flex-col mb-2">
      <label className="text-sm ml-2">{label}</label>
      {data.map((item, index) => (
        <div key={`sd.${name}.${index}`} className="my-1">
          <input
            type="radio"
            value={item}
            name={name}
            className={`${className} bg-gray-100 py-2 px-3 rounded-xl`}
            id={`sd.${name}.${index}`}
            required={required}
          />
          <label
            htmlFor={`sd.${name}.${index}`}
            className={`${className} ${item} capitalize py-2 px-5 bg-gray-200 ml-2 rounded-xl`}
          >
            {item}
          </label>
        </div>
      ))}
    </div>
  );
};

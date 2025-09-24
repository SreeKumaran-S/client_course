export const inputRenderMap = {
  "text": ({ field }) => renderInput({ field, type: "text" }),
  "tel": ({ field }) => renderInput({ field, type: "tel" }),
  "date": ({ field }) => renderInput({ field, type: "date" }),
  "submit": ({ field }) => renderInput({ field, type: "submit" }),
  "reset": ({ field }) => renderInput({ field, type: "reset" }),
  "select": ({ field }) => (
        <select 
          className={field.className} 
          value={field.value} 
          onClick={field.onClick} 
          onChange={field.onChange}>
            {field.options.map((option, ind) => (
                <option key={ind} value={option.value} hidden={option.hide}>{option.value}</option>
            ))}
        </select>
    ),
  "actions": ({ field }) => (
     <div className={field.className}>
      {field.children.map((child, ind) => {
        let ChildRenderer = inputRenderMap[child.type];
        return <ChildRenderer key={ind} field={child} />;
      })}
    </div>
  )
}

const renderInput = ({ field, type = "text" }) => (
  <input
    className={field.className}
    type={type}
    value={field.value}
    onChange={field.onChange}
    onClick={field.onClick}
    max={field.max_limit} 
  />
);
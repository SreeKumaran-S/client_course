export const inputRenderMap = {
    "text": ({ field }) => <input className={field.className} type="text" value={field.value} onChange={field.onChange} onClick={field.onClick} />,
    "tel": ({ field }) => <input className={field.className} type="tel" value={field.value} onChange={field.onChange} onClick={field.onClick} />,
    "date": ({ field }) => <input className={field.className} type="date" max={field.max_limit} value={field.value} onChange={field.onChange} onClick={field.onClick} />,
    "select": ({ field }) => (
        <select className={field.className} value={field.value} onClick={field.onClick} onChange={field.onChange}>
            {field.options.map((option, ind) => (
                <option key={ind} value={option.value} hidden={option.hide}>{option.value}</option>
            ))}
        </select>
    ),
    "submit": ({ field }) => <input className={field.className} type={field.type} value={field.value} onChange={field.onChange} onClick={field.onClick} />,
    "reset": ({ field }) => <input className={field.className} type={field.type} value={field.value} onChange={field.onChange} onClick={field.onClick} />,
    "actions": ({ field }) => (
     <div className={field.className}>
      {field.children.map((child, ind) => {
        let ChildRenderer = inputRenderMap[child.type];
        return <ChildRenderer key={ind} field={child} />;
      })}
    </div>
  )
}
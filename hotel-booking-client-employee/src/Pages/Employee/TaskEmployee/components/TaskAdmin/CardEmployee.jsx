const CardEmployee = ({employee, color, setSelectedRole}) => {
  let card = employee.map((item, key) => (
    <div
      className='block-chart-task-container'
      style={{ backgroundColor: color[key] }}
      onClick={() => setSelectedRole(item)}
    >
      <div className='block-chart-task-bg'>
        <div className='d-flex justify-content-between'>
          <p>{item}</p>
          <p style={{ color: 'gray' }}>Активных задач: 0</p>
        </div>
        <div>
          <p style={{ color: 'gray', margin: 0, paddingTop: '2vh' }}>Среднее выполнение задач: 05:32</p>
        </div>
      </div>
    </div>
  ))
  return card
}

export default CardEmployee
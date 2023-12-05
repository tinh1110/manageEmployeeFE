export const convertDataSourceTimekeeping = (data: any) => {
  return data.map((item: any) => {
    const times: any = {}
    item.time.forEach((input: any, index: number) => {
      times[`check-in-${index + 1}`] = input['Check-in']
      times[`check-out-${index + 1}`] = input['Check-out']
    })
    return {
      name: item.user_name,
      ...times,
      late: item.late,
      forget: item.forget,
      paid_leave: item.paid_leave,
      unpaid_leave: item.unpaid_leave,
      day_work: item.day_work,
      day_off: item.day_off,
    }
  })
}

export const calculateDayByMonth = (month: number) => {
  const year = new Date().getFullYear()
  return new Date(year, month, 0).getDate()
}

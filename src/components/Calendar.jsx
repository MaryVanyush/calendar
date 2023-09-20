import moment from 'moment';
import 'moment/locale/ru'

export const Calendar = ({now}) => {
  moment.updateLocale('ru', {week: {dow: 1}});
  const startDayMonth = moment().startOf('month')
  const startWeekMonth = moment().startOf('month').startOf('week')
  const endDayMonth = moment().endOf('month')
  const endWeekMonth = moment().endOf('month').endOf('week')
  const dates = [];
  let currentDay = startWeekMonth.clone().startOf('day');
  
  while (currentDay.isBefore(endWeekMonth)) {
    dates.push(currentDay.clone());
    currentDay.add(1, 'day');
  }

  if (dates[0].day() !== 1) {
    dates.shift();
  }

  const weeks = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  const tableRows = weeks.map((week, index) => (
    <tr key={index}>
      {week.map((date) => (
        <td
          key={date.format("D")}
          className={
            date.isSame(now, "day")
              ? "ui-datepicker-today"
              : date.isBefore(startDayMonth) || date.isAfter(endDayMonth)
              ? "ui-datepicker-other-month"
              : ""
          }
        >
          {date.format("D")}
        </td>
      ))}
    </tr>
  ));
    const currentDate = moment();
    const monthName = currentDate.format("MMMM");
    const monthNameGenitive = currentDate.format("MMMM").replace(/ь$/i, "я");
    const year = currentDate.format("YYYY");

    const dayOfWeekName = currentDate.format("dddd").replace(/^\w/, (c) => c.toUpperCase());
    const dayOfMonth = currentDate.format("D");

    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{dayOfWeekName}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{dayOfMonth}</div>
                    <div className="ui-datepicker-material-month">{monthNameGenitive}</div>
                    <div className="ui-datepicker-material-year">{year}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{monthName}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col className="ui-datepicker-week-end"/>
                    <col className="ui-datepicker-week-end"/>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
        </div>
    )
  }
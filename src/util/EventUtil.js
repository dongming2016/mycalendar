import { isPlainObject, isString } from '../util/util'
import Event from '../model/Event'
import moment from 'moment'

export const EventUtil = {
  handleEvents (labels, events, currDate) {
    currDate = moment(currDate)
    const dayEvents = []
    labels.forEach(element => {
      let name = ''
      if (isPlainObject(element)) {
        name = element.name
      } else if (isString(element)) {
        name = element
      }
      const eventList = []
      let isEventExist = false
      // 如果当前时间有事件，则将事件添加到事件列表中，否则创建一个空的事件
      for (let i = 0; i < events.length; i++) {
        if (events[i].getId() === currDate.calendar() + '_' + element.id) {
          eventList.push(events[i])
          isEventExist = true
          break
        }
        isEventExist = false
      }
      if (!isEventExist) {
        eventList.push(new Event(element.id, currDate, name, ''))
      }
      dayEvents.push({
        label: element,
        events: eventList
      })
    })
    return dayEvents
  }
}

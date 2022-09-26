interface ActionProps {
  name: string
  title: string
  icon: string
}

export const actionList: ActionProps[] = [
  {
    name: 'evelRecord',
    title: '评估记录',
    icon: '../../../static/images/me/me_action_record.png',
  },
  {
    name: 'consumeRecord',
    title: '消费记录',
    icon: '../../../static/images/me/me_consume_record.png',
  },
]

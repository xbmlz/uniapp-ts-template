interface ActionProps {
  name: string
  title: string
  icon: string
}

export const actionList: ActionProps[] = [
  {
    name: 'evelRecord',
    title: '评估记录',
    icon: '../../../static/images/me/action_eval_record.png',
  },
  {
    name: 'consumeRecord',
    title: 'V币记录',
    icon: '../../../static/images/me/action_vb_record.png',
  },
]

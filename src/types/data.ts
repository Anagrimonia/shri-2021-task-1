import type { User } from './user' ;

// ### Лидеры, алиас шаблона `leaders`
// * `title` — заголовок
// * `subtitle` — подзаголовок, в нашем случае название спринта
// * `emoji` — используется для акцентов в интерфейсе
// * `selectedUserId` — необязательное, содержит ID выбранного участника, отображение результатов голосования
// * `users` — упорядоченный массив с участниками команды
export type LeadersData = {
  title: string, 
  subtitle: string, 
  emoji: string, 
  selectedUserId?: number,
  users: Array<User>
}

// ### Голосование, алиас шаблона `vote`
// * `title` — заголовок
// * `subtitle` — подзаголовок, в нашем случае название спринта
// * `emoji` — используется для акцентов в интерфейсе
// * `selectedUserId` — необязательное, содержит ID выбранного ранее участника
// * `offset` — необязательное, индекс пользователя в массиве, которого нужно отобразить первым
// * `users` — упорядоченный массив с участниками голосования
export type VoteData = {
  title: string, 
  subtitle: string, 
  emoji: string, 
  selectedUserId?: number,
  offset?: number,
  users: Array<User>
}

// ### Статистика, алиас шаблона `chart`
// * `title` — заголовок
// * `subtitle` — подзаголовок, в нашем случае название спринта
// * `users` — массив с участниками команды
// * `values` — упорядоченный массив предыдущих, текущего и следующих периодов, элемент массива содержит: 
//     * `title` — заголовок периода
//     * `value` — число, значение для периода
//     * `active` — булев признак, является ли элемент текущим
export type ChartData = {
  title: string, 
  subtitle: string, 
  users: Array<User>,
  values: {
    title: string,
    value: number,
    active: boolean
  }[]
}

// ### Круговая диаграмма, алиас шаблона `diagram`
// * `title` — заголовок
// * `subtitle` — подзаголовок, в нашем случае название спринта
// * `totalText` — строка, содержит значение и единицы
// * `differenceText` — строка, содержит разницу со значением предыдущего периода (спринта) и единицы
// * `categories` — категории, по которым выводится статистика, категория содержит:
//     * `title` — заголовок категории
//     * `valueText` — строка, содержит значение и единицы измерения
//     * `differenceText` — строка, значение разницы с предыдущим периодом и единицы по категории
export type DiagramData = {
  title: string, 
  subtitle: string, 
  totalText: string, 
  differenceText: string,
  categories: {
    title: string,
    valueText: string,
    differenceText: string
  }[]
}

// ### Карта активности, алиас шаблона `activity`
// * `title` — заголовок
// * `subtitle` — подзаголовок, в нашем случае название спринта
// * `data` — данные по дням недели, один день — упорядоченный массив из 24 элементов, соответствуют часам
export type ActivityData = {
  title: string, 
  subtitle: string, 
  data: {
    "mon": number[],
    "tue": number[],
    "wed": number[],
    "thu": number[],
    "fri": number[],
    "sat": number[],
    "sun": number[]
  }
}
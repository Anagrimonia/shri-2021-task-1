// ### Участник команды
// * `id` — ID участника
// * `name` — имя участника
// * `avatar` — имя файла с аватаркой участника
// * `valueText` — строка, содержит значение и единицы (необязательно), например строки и голоса

export type User = {
  id: number;
  name: string;
  avatar: string;
  valueText: string;
};
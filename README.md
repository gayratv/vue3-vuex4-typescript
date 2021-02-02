# Типизация Vuex 4 для Vue 3
Целью данного проекта является типизация методов Vuex - commit, dispatch, getters и поддержка автокомлита при применении стора в пользовательских методах.

## Зависимости
Данный проект компилируется только в среде **<span style="color:red">typescript 4</span>** - обратите внимание на свой package.json (по умолчанию vue create устанавливает typescript версии 3)

## Введение
11 месяцев назад вышла новая версия Vuex 4 с поддержкой Vue 3
https://github.com/vuejs/vuex/tree/4.0

Из коробки Vuex не предусматривает типизацию и автокомплит методов commit, dispatch

Для VUE 2 предлагаются изящные решения на базе декораторов, например  
https://championswimmer.in/vuex-module-decorators/

Если мы заглянем в исходный код проекта, то увидим что оно разрабатывалось для  "vue": ">=2" и "vuex": "3"

Использование декораторов в Vue 3 основано на библиотеке vue-class-component на которую в натоящий момент даже не выпущена документация    
https://github.com/vuejs/vue-class-component/tree/next

Таким образом использование декораторов для типизации Vuex 4 для Vue 3 по моему мнению в настоящий момент выглядит сложной затеей.

## Мое решение основывается на проекте  
https://github.com/andrewvasilchuk/vuex-typescript

И статье:  
https://dev.to/3vilarthas/vuex-typescript-m4j

Прдлагаемый Андреем метод на мой взгляд требует большого объема дополнительного кода и я на его основе реализовал свой пример

## Основные моменты
Согасен с Андреем что типизация модулей в store будет достаточно сложной - поэтому типизацию я провел без использования концепции модулей Vuex. В связи с этим само создание store выглядит достаточно сложно.

Основная идея заключается в создании новых типов из типов Vex с помощью Omit и переписыввания типов для мутаций, actions и getters.

В примере имеется основной файл - index.ts и подключаемые файлы (не модули Vuex) в которых разрабатывается некая своя логика (в примере это counter и auth)

Для mutatations я несколько упростил задачу и все mutations должны возвращать void

Для Actions я поддержал типизацию payload и значения, возвращаемого action

Типизация выполнена на основе возможности typescript 4 - named tupples

В файлах -примерах я комментариями пометил неизменяемую часть кода, остальной код пишите сами, анлогично неизменяемый шаблон выделил в index
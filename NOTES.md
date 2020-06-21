W projektcie zainstalowałem gulpa który umożliwia kompilacje kodu Sass do css oraz dodałem w nim autoprefixera do Css dzięki czemu kod css jest kompatibylny z większością przeglądarek
Dodałem gulp-babel który umożliwia kompilacje kodu do starszych wersji JS jeszcze nie jest w pełni funkcjonalne
Zad.1
Lista kanałów:
a.Zacząłem od stworzenia w html jednego kanału i ostylowania go zgodnie z zasadą mobile first 
b.następnie napisałem funkcje getChannels która pobierała dane z JSON Server oraz obsługę błedów
c.getChannels w przypadku powodzenia uruchamia funkcje od parametru pobranych danych one_channel()
d.one_channel na podstawie parametru tworzy w elemencie HTML main innerHtml za pomocą funkcji html
e.html zwraca w stringu kod pojedynczego kanału_

Sortowanie za pomocą select:
a.check_input_sort dodaje listenery do inputów, wykonuję ją jako callback getChannel, ponieważ potrzebuje danych pobranych z getChannels
b.Funkcja na inputach wykonuje się tylko raz

Filtrowanie po wpisanym tekście:
a.nadaje inputowi event change i wykonuje funkcje one_channel od przefiltrowanej tablicy

20.06
Dodałem funkcje sort_select która sortuje każdy select listę kanałów za pomocą parametrów  

21.06
Babel do kompilacji js działa, użyłem scriptu który wspomaga async/await funkcje, poprawiłem wyrażenie regularne do przecinków w liczbach
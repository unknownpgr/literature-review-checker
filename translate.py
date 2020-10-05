import csv
from googletrans import Translator
translator = Translator()


def translate(row, column):
    result = translator.translate(row[column], dest="ko")
    return row+[result.text]


def convert(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as fi:
        with open(output_file, 'w', encoding='utf-8', newline='') as fo:
            fo.write('\ufeff')
            ci = csv.reader(fi)
            co = csv.writer(fo)
            header = True
            column_abstract = -1
            column_title = -1
            for row in ci:
                if header:
                    column_abstract = row.index('Abstract')
                    column_title = row.index('Title')
                    header = False
                    co.writerow(row+['Translated'])
                else:
                    print(row[column_title])
                    co.writerow(translate(row, column_abstract))


convert('scopus.csv', 'converted.csv')

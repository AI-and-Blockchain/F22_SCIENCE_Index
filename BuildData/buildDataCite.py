f = open("/data/SCIENCE-index/authorsFinalNames.csv", 'r')

print(f.readline())
print(f.readline())

import requests
import json

out = open("/data/SCIENCE-index/authorsFullDataCite.csv", 'w', buffering=1)
out.write("AuthorId,Name,careerLength,PaperCount,CitationCount,Hindex,DataShareCount\n")


for line in f:
  name = line.split(',')[6].split()
  line = line.split(',')
  name = "%20".join(name)
  query = "https://api.datacite.org/dois?resource-type-id=dataset&query={}".format(name)
  resp = requests.get(query)
  js = json.loads(resp.text)
  datacount = len(js["data"])
  if datacount == 0: continue
  temp = str(line[1]) + ',' + str(line[6].strip()) + ',' + str(line[2]) + ',' + str(line[3]) + ',' + str(line[4]) + ',' + str(datacount) + '\n'
  out.write(temp)



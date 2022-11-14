

papdata = open("/data/SCIENCE-index/Papers.txt", "r")

out = open("/data/SCIENCE-index/papers.csv", "w")

out.write("PaperId,Year,EstimatedCitation\n")

for line in papdata:
  line = line.split()
  id = line[0]
  
  year = ""
  for item in line:
    if item.count('-') == 2 and (item.split('-')[0]).isnumeric():
      year = item.split('-')[0]
      break
    
  estimatedcitation = ""
  for i in range(len(line)-1, -1, -1):
    if len(line[i]) >= 5: continue
    if i-1 >= 0 and i-2 >= 0 and line[i].isnumeric() and line[i-1].isnumeric() and line[i-2].isnumeric():
      estimatedcitation = line[i]
      break
  
  if estimatedcitation == "" or estimatedcitation == '0' or len(year) != 4 or year == "": continue
  else: out.write(id + ',' + year + ',' + estimatedcitation + '\n')
  

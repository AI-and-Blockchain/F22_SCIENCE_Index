

papdata = open("/data/SCIENCE-index/Papers.txt", "r")

out = open("/data/SCIENCE-index/papers.csv", "w")

out.write("PaperId,Year,EstimatedCitation\n")


for line in papdata:
  line = line.split('\t')
  temp = str(line[0]) + ',' + str(line[7]) + ',' + str(line[20]) + '\n'
  out.write(temp)
  

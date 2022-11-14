

f = open("/data/SCIENCE-index/PaperAuthorAffiliations.txt", 'r')

print("help")
out = open("/data/SCIENCE-index/paperauthoraffiliations.csv", 'w')
out.write("PaperId,AuthorId\n")
for line in f:
  line = line.split()
  temp = str(line[0]) + ',' + str(line[1]) + '\n'
  out.write(temp)
  

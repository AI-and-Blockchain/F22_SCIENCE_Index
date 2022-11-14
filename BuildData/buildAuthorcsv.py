
f = open("/data/SCIENCE-index/Authors.txt", 'r')

print("help")
out = open("/data/SCIENCE-index/authors.csv", 'w')
out.write("AuthorId,PaperCount,CitationCount\n")
for line in f:
  line = line.split()
  temp = str(line[0]) + ',' + str(line[-4]) + ',' + str(line[-2]) + '\n'
  out.write(temp)
  

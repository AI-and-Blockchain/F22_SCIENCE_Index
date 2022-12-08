# SCIENCE-index dataset processing and building

We use the microsoft academic graph found [here](https://learn.microsoft.com/en-us/academic-services/graph/media/erd/entity-relationship-diagram.png).
Specifically, we grab compressed text files from [Zenodo](https://zenodo.org/record/6511057#.Y2UsBHbMLel).

# Gathering

We build csv files from the text files by parsing for specifically what we need for [Authors](/BuildData/buildAuthorcsv.py), [Paper/Author Affiliations](/BuildData/BuildPaperAuthAffils.py), and [Papers](/BuildData/buildPaperCiteLists.py).


# Processing

In [our final processing notebook](/BuildData/buildFinalDF.Rmd), we use the three dataframes described above to match Authors with their paper lists and ultimately calculate their h-index. 
The final outputted dataframe has a schema of AuthorId, PublicationCount, CitationCount, hIndex, CareerLength

## Datacite

In [the Datacite notebook](/BuildData/DataCiteSet.Rmd), using the prior mentioned dataframe, we get author names, and we utilize the [Datacite API](https://datacite.org/) to lookup author names to see if they have publicly shared data. We count this and include it in our dataset.
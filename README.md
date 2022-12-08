# SCIENCE-index
We present the SCIENCE-index, a self-sustaining metric bootstrapped via 21 million data points from the Microsoft Academic Graph~\cite{sinha2015an}. 
Using a robust multiple linear regression across several academic career statistics, we predict a researcher's h-index and compare this to their actual h-index. 
This difference is then normalized to a scale from zero to ten. Five means expected, under five is below average, and over five is above average. 
We persist the model via smart contract on a public blockchain. This allows the model to exist publicly and continue to scale and update as it is used by researchers.

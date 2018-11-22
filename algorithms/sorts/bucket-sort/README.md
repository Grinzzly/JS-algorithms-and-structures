# Bucket Sort

**Bucket sort** is a distribution sort. It works by arranging elements 
into ‘buckets’ which are then sorted using another sort. This typically 
utilizes insertion sort then merged into a sorted list.

Bucket sort is exceptionally fast because of the way elements are 
strategically assigned to buckets. This is normally through using an 
array where the index is the value. This means that there’s a higher cost 
of memory for the sake of speed.

The steps are:

1. Elements are distributed among bins

![Bucket Sort](https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Bucket_sort_1.svg/311px-Bucket_sort_1.svg.png)

2. Then, elements are sorted within each bin

![Bucket Sort](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Bucket_sort_2.svg/311px-Bucket_sort_2.svg.png)


[JS implementation](BucketSort.js)

## Pseudocode for Implementation

```text
Import some type of insertion sort to use in bucket sort function
Create bucketSort function (array, bucket size)
  Create vars for i, min, max, and bucket size
  Find min and max value
  Create amount of buckets
  Push values to correct buckets 
  Sort buckets
```
## Complexity

| Name                  | Best            | Average             | Worst               | Memory    | Stable    | Comments  |
| --------------------- | :-------------: | :-----------------: | :-----------------: | :-------: | :-------: | :-------- |
| **Bucket Sort**        | n+k   | n+k       | n²       | n+k    | Yes        |  Usually done to sort a list that is so huge you can’t fit it into memory |

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Bucket_sort)
- [Bucket Sort Visualization](https://www.cs.usfca.edu/~galles/visualization/BucketSort.html)
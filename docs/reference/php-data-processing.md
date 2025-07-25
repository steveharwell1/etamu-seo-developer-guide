# Functions
```php
array_map(?callback $callback, array $array, array ...$arrays): array

array_filter(array $array, ?callable $callback = null, int $mode = 0): array

array_reduce(array $array, callable $callback, mixed $initial = null): mixed

array_unique(array $array, int $flags = SORT_STRING): array
```

## Mappers
```php
array_values(array $array): array
array_keys(array $array): array

```

## Reducers
```php
array_count_values(array $array): array // like python Counter


```
# Arrays
Map
```php
array_map(?callback $callback, array $array, array ...$arrays): array
```
Where callback is `(any...) => any` and the number of arrays passed is the number of arguments.

Filter
```php
array_filter(array $array, ?callable $callback = null, int $mode = 0): array
```
If callback returns true the value is retained.

Reduce
```php
array_reduce(array $array, callable $callback, mixed $initial = null): mixed
```
Zip
```php
array_map(null, array $array, array ...$arrays): array
```

Enumerate
```php
foreach (array_values($lst) as $i => $val) {
        echo "$i $val \n";
}
```

# Associative Array
Map is done using array map while leveraging the ability to zip multiple arrays
```php
array_map($callback, array_keys($arr), array_values($arr));
```

Filter
```php
array_filter(array $array, ?callable $callback = null, ARRAY_FILTER_USE_BOTH): array
```

# Strings


# Types
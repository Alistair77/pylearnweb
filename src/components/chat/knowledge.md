# PyLearnWeb assistant — answer bank

Format and scoring rules live in answer.js. Entries listed earlier win ties, so specific
entries sit above general ones.

## greeting
keys: hi, hello, hey, hiya, yo, sup, howdy, greetings, good morning, good afternoon, good evening, hola
kind: smalltalk
Hey there! I'm the PyLearnWeb assistant. Ask me anything about Python — like `how do lists work?`, `what is a dictionary?` or `how do I fix IndentationError?` — or about our courses.

## how-are-you
keys: how are you, how r u, hows it going, how is it going, how are things, you okay, whats up
kind: smalltalk
Running smoothly, no exceptions raised. Thanks for asking! What would you like to learn today?

## thanks
keys: thanks, thank, thx, ty, cheers, appreciate, helpful, great, awesome, nice, cool, perfect
kind: smalltalk
Happy to help! Ask another question anytime — that's how Python sticks.

## goodbye
keys: bye, goodbye, cya, later, see you, good night, gtg
kind: smalltalk
See you soon! Keep coding — even 20 minutes a day adds up fast.

## who-are-you
keys: who are you, what are you, your name, are you a bot, are you ai, are you human, are you real, who made you, who built you
kind: smalltalk
I'm the PyLearnWeb assistant — a built-in Python helper. I can explain Python concepts with examples, help decode common errors, and answer questions about our courses. I run right in your browser, so answers are instant.

## what-can-you-do
keys: what can you do, help me, can you help, what do you know, what can i ask, capabilities, commands, menu
kind: smalltalk
I can help with:
- **Python basics** — variables, types, strings, numbers, `if`, loops
- **Data structures** — lists, tuples, dictionaries, sets, comprehensions
- **Functions & classes** — arguments, lambdas, decorators, OOP, inheritance
- **Errors** — `IndentationError`, `TypeError`, `KeyError` and friends
- **Tools** — pip, virtual environments, testing, type hints
- **Where to go next** — web, data, automation, project ideas
Try: `how do I reverse a list?`

## joke
keys: joke, funny, make me laugh, something fun
kind: smalltalk
Why do Python programmers prefer dark mode? Because light attracts bugs.

And one more: I would tell you a UDP joke, but you might not get it.

## acknowledge
keys: ok, okay, k, yes, yeah, yep, no, nope, sure, alright, lol, haha, hmm, cool beans
kind: smalltalk
Got it. What would you like to learn next? Try `how do dictionaries work?` or `project ideas`.

## time
keys: what time, the time, current time, time is it
kind: smalltalk
It's {time} on your device right now. Perfect time for a quick Python exercise.

## date
keys: what day, todays date, the date, what date, day is it
kind: smalltalk
Today is {date}.

## courses
keys: course, courses, track, tracks, curriculum, beginner track, practitioner track, professional track, program, syllabus, lesson, lessons
We offer three learning tracks:
1. **Beginner Track** — start from zero: syntax, logic, and your first working programs.
2. **Practitioner Track** — real projects, testing, and clean-code practices for job-ready skills.
3. **Professional Track** — APIs, data pipelines, and deployment, with mentor code review.

## pricing
keys: price, pricing, cost, costs, free, pay, subscription, fee, fees, how much
Pricing details are being finalised. Use the contact form at the bottom of the home page and we'll get back to you with current plans.

## contact
keys: contact, email, support, reach, talk to human, phone, get in touch
You can reach the team through the **Connect With Us** form on the home page — we reply to every message.

## platform
keys: how does pylearnweb work, how it works, pylearnweb, your platform, mentor, mentors, code review
PyLearnWeb pairs a structured, project-based curriculum with automated checks and real mentor feedback — every lesson ends with something you built, checked, and understand.

## where-to-start
keys: where to start, where do i start, how to start, get started, start learning, new to python, complete beginner, never coded, first step, roadmap, learning path
Great question. A solid path:
1. Install Python and run `print("Hello, world!")`
2. Learn **variables, types, `if` and loops**
3. Get comfortable with **lists and dictionaries**
4. Write **functions**, then small scripts that solve your own problems
5. Build a project: a to-do app, a web scraper, a quiz game
Our **Beginner Track** follows exactly this path with exercises at every step.

## how-long
keys: how long, how many months, how much time, how fast can i learn, learn quickly
With about an hour a day, most people get comfortable with the basics in **4–8 weeks** and can build useful small projects in **2–3 months**. Consistency matters more than long sessions — code a little every day.

## what-is-python
keys: what is python, why python, why learn python, is python good, python used for, what can python do, is python hard, is python easy
Python is a general-purpose programming language known for readable, beginner-friendly syntax. It's used for:
- **Web backends** (Django, Flask, FastAPI)
- **Data analysis & AI** (pandas, NumPy, scikit-learn, PyTorch)
- **Automation & scripting** (files, spreadsheets, web scraping)
- **Testing, DevOps, and much more**
It's one of the easiest first languages — and still used by professionals everywhere.

## install
keys: install, installing, download python, setup python, set up python, python version, which version
Download Python 3 from **python.org** (the installer on Windows — tick **Add Python to PATH**). On macOS you can also use `brew install python`. Then check it works:
```bash
python3 --version
```
Use the latest Python 3 release — Python 2 is retired.

## hello-world
keys: hello world, first program, print, printing, output, display text
Your first program is one line:
```python
print("Hello, world!")
```
`print()` can take several values and joins them with spaces:
```python
name = "Ada"
print("Hi", name, "!")   # Hi Ada !
```

## comments
keys: comment, comments, docstring, docstrings, hash sign
Use `#` for comments and triple-quoted strings for docstrings:
```python
# This is a comment
def area(r):
    """Return the area of a circle with radius r."""
    return 3.14159 * r ** 2
```
Comments explain **why**; clear names explain **what**.

## variables
keys: variable, variables, assign, assignment, declare, naming, var
A variable is a name pointing to a value — no type declaration needed:
```python
age = 25
name = "Sam"
price = 9.99
x, y = 10, 20        # assign several at once
```
Use `snake_case` names, and they can be reassigned to any type.

## data-types
keys: data type, data types, type, types, datatype, int, float, bool, boolean, type function
Python's core types:
```python
42          # int
3.14        # float
"hi"        # str
True        # bool
None        # NoneType
[1, 2]      # list
(1, 2)      # tuple
{"a": 1}    # dict
{1, 2}      # set
```
Check a value's type with `type(x)` or `isinstance(x, int)`.

## type-conversion
keys: convert, conversion, casting, cast, string to int, int to string, str to int, typecast, parse number
Convert with the type's name:
```python
int("42")        # 42
float("3.5")     # 3.5
str(100)         # "100"
list("abc")      # ['a', 'b', 'c']
```
`int("hello")` raises `ValueError` — wrap user input in `try/except` if it might not be a number.

## input
keys: input, user input, read input, ask user, keyboard, get input
`input()` always returns a **string**:
```python
name = input("What's your name? ")
age = int(input("Your age? "))   # convert for numbers
print(f"Hi {name}, next year you'll be {age + 1}")
```

## fstrings
keys: f string, f strings, fstring, format, formatting, string formatting, format string, interpolation, round decimals
f-strings are the modern way to build strings:
```python
name, score = "Ada", 93.456
print(f"{name} scored {score:.1f}%")   # Ada scored 93.5%
print(f"{2 + 3 = }")                  # 2 + 3 = 5
```
Put any expression inside `{}`; `:.2f` formats decimals, `:,` adds thousands separators.

## string-split-join
keys: split, join, split string, join string, words, separate string, strip, replace
```python
"a,b,c".split(",")          # ['a', 'b', 'c']
" ".join(["hi", "there"])   # 'hi there'
"  hi  ".strip()            # 'hi'
"cat".replace("c", "b")     # 'bat'
```

## strings
keys: string, strings, str, text, substring, slice string, uppercase, lowercase, string methods, character
Strings are immutable sequences of characters:
```python
s = "Python"
s[0]        # 'P'
s[-1]       # 'n'
s[0:3]      # 'Pyt'
s.upper()   # 'PYTHON'
len(s)      # 6
"th" in s   # True
```
Methods return **new** strings — `s.upper()` doesn't change `s`.

## numbers
keys: number, numbers, math, arithmetic, division, integer division, modulo, remainder, power, exponent, floor, round, calculate
```python
7 / 2    # 3.5   true division
7 // 2   # 3     floor division
7 % 2    # 1     remainder
2 ** 10  # 1024  power
round(3.14159, 2)  # 3.14
```
For more, `import math` gives `math.sqrt`, `math.pi`, `math.floor`…

## conditionals
keys: if, else, elif, if statement, condition, conditions, conditional, if else, ternary
```python
temp = 28
if temp > 30:
    print("Hot")
elif temp > 20:
    print("Warm")
else:
    print("Cold")

label = "even" if temp % 2 == 0 else "odd"   # one-line version
```
Indentation (4 spaces) defines the block.

## operators
keys: operator, operators, comparison, logical, and or not, equals, not equal, boolean logic
```python
x == y    # equal
x != y    # not equal
x > y, x <= y
a and b   # both true
a or b    # either true
not a     # flip
1 < x < 10   # chained comparison
```

## is-vs-equals
keys: is vs, is and, identity, is operator, is none, none, null
`==` compares **values**; `is` checks if two names point to the **same object**:
```python
[1, 2] == [1, 2]   # True
[1, 2] is [1, 2]   # False (two separate lists)
```
Use `is` only for `None`: `if result is None:`. `None` is Python's "no value" (like null).

## for-loops
keys: for loop, for loops, for, loop, loops, iterate, iteration, range, repeat
```python
for fruit in ["apple", "banana"]:
    print(fruit)

for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10, 2): # 2, 4, 6, 8
    print(i)
```

## while-loops
keys: while, while loop, break, continue, infinite loop, stop loop, exit loop
```python
count = 0
while count < 3:
    print(count)
    count += 1

while True:
    cmd = input("> ")
    if cmd == "quit":
        break        # leave the loop
    if cmd == "":
        continue     # skip to next round
```

## enumerate-zip
keys: enumerate, zip, index and value, loop with index, two lists together
```python
for i, name in enumerate(["a", "b"], start=1):
    print(i, name)          # 1 a / 2 b

for name, score in zip(["Ada", "Bo"], [90, 85]):
    print(name, score)
```

## list-vs-tuple
keys: list vs tuple, tuple vs list, list and tuple, difference list tuple
- **List** `[1, 2]` — mutable: add, remove, change items
- **Tuple** `(1, 2)` — immutable: fixed once created, slightly faster, usable as dict keys
Use a tuple for fixed records (`point = (3, 4)`), a list for collections that change.

## reverse-list
keys: reverse, reverse list, reverse a list, reverse string, backwards
```python
nums = [1, 2, 3]
nums.reverse()        # in place → [3, 2, 1]
nums[::-1]            # new reversed copy
"hello"[::-1]         # 'olleh'
```

## sorting
keys: sort, sorting, sorted, order, ascending, descending, sort by
```python
nums = [3, 1, 2]
sorted(nums)                  # [1, 2, 3] new list
nums.sort(reverse=True)       # in place → [3, 2, 1]

people = [("Ada", 36), ("Bo", 25)]
sorted(people, key=lambda p: p[1])   # sort by age
```

## list-comprehension
keys: list comprehension, comprehension, comprehensions, one line loop, dict comprehension, set comprehension
A compact way to build lists:
```python
squares = [n * n for n in range(5)]          # [0, 1, 4, 9, 16]
evens = [n for n in range(10) if n % 2 == 0]
lengths = {w: len(w) for w in ["hi", "hey"]} # dict comprehension
```

## lists
keys: list, lists, array, arrays, append, insert, remove, pop, index, slice, slicing, add to list
Lists are ordered, changeable collections:
```python
nums = [3, 1, 4]
nums.append(5)      # [3, 1, 4, 5]
nums.insert(0, 9)   # [9, 3, 1, 4, 5]
nums.remove(1)      # removes first 1
last = nums.pop()   # removes & returns last
nums[1:3]           # slice
len(nums), 4 in nums
```

## tuples
keys: tuple, tuples, unpacking, unpack, immutable sequence
```python
point = (3, 4)
x, y = point          # unpacking
a, *rest = (1, 2, 3)  # a=1, rest=[2, 3]
```
Tuples can't be changed after creation.

## dictionaries
keys: dictionary, dictionaries, dict, dicts, key value, keys, values, items, hashmap, map, lookup
Dictionaries map keys to values:
```python
user = {"name": "Ada", "age": 36}
user["email"] = "ada@example.com"   # add / update
user.get("phone", "n/a")            # safe lookup with default
for key, value in user.items():
    print(key, value)
"age" in user                       # True
```

## sets
keys: set, sets, unique, duplicates, remove duplicates, union, intersection
Sets hold unique items:
```python
tags = {"py", "web", "py"}    # {'py', 'web'}
unique = list(set([1, 1, 2])) # remove duplicates
a, b = {1, 2}, {2, 3}
a | b   # union {1, 2, 3}
a & b   # intersection {2}
```

## copy
keys: copy, deep copy, deepcopy, shallow copy, clone, duplicate list
```python
import copy
a = [[1, 2], [3]]
b = a            # same object!
c = a.copy()     # shallow: new outer list, shared inner lists
d = copy.deepcopy(a)   # fully independent
```

## mutable
keys: mutable, immutable, mutability, changeable
- **Mutable** (can change in place): `list`, `dict`, `set`
- **Immutable**: `int`, `float`, `str`, `tuple`, `bool`
Watch out for mutable default arguments — use `def f(items=None):` then `items = items or []`.

## default-args
keys: default argument, default arguments, args, kwargs, star args, keyword argument, keyword arguments, optional parameter
```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

def total(*nums):          # any number of positional args
    return sum(nums)

def show(**info):          # any number of keyword args
    print(info)

greet("Ada", greeting="Hi")
total(1, 2, 3)             # 6
show(a=1, b=2)             # {'a': 1, 'b': 2}
```

## lambda
keys: lambda, anonymous function, inline function, map, filter
A lambda is a small unnamed function:
```python
double = lambda x: x * 2
list(map(double, [1, 2]))            # [2, 4]
list(filter(lambda x: x > 1, [1, 2, 3]))  # [2, 3]
```
For anything longer than one expression, use `def`.

## decorators
keys: decorator, decorators, wrapper, at sign, @
A decorator wraps a function to add behaviour:
```python
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.perf_counter() - start:.3f}s")
        return result
    return wrapper

@timer
def slow():
    time.sleep(0.5)
```

## generators
keys: generator, generators, yield, iterator, iterators, lazy
Generators produce values one at a time with `yield`, saving memory:
```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for x in countdown(3):
    print(x)   # 3, 2, 1

squares = (n * n for n in range(10**6))   # generator expression
```

## recursion
keys: recursion, recursive, factorial, fibonacci, calls itself
```python
def factorial(n):
    if n <= 1:           # base case
        return 1
    return n * factorial(n - 1)

factorial(5)   # 120
```
Always include a base case, or you'll hit `RecursionError`.

## scope
keys: scope, global, nonlocal, local variable, global variable
Variables made inside a function are local to it:
```python
count = 0
def bump():
    global count     # needed to reassign the outer name
    count += 1
```
Prefer returning values over `global` — it keeps code easier to test.

## functions
keys: function, functions, def, define function, return, parameter, parameters, argument, call function
```python
def add(a, b):
    """Return the sum of a and b."""
    return a + b

result = add(2, 3)   # 5
```
Functions without `return` give back `None`.

## main-guard
keys: name main, if name main, __name__, __main__, main function
```python
def main():
    print("Running as a script")

if __name__ == "__main__":
    main()
```
This runs `main()` only when the file is executed directly, not when it's imported.

## classes
keys: class, classes, object, objects, oop, object oriented, self, __init__, init, constructor, method, methods, instance, attribute
```python
class Dog:
    def __init__(self, name):
        self.name = name        # instance attribute

    def bark(self):
        return f"{self.name} says woof"

rex = Dog("Rex")
rex.bark()   # 'Rex says woof'
```
`self` is the instance the method was called on.

## inheritance
keys: inheritance, inherit, subclass, parent class, child class, super, polymorphism, override
```python
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."

class Cat(Animal):
    def speak(self):            # override
        return "Meow"

class Kitten(Cat):
    def __init__(self, name, age):
        super().__init__(name)  # call parent's init
        self.age = age
```

## dunder
keys: dunder, magic method, magic methods, __str__, __repr__, __len__, special method, dataclass, dataclasses
Dunder methods hook into Python syntax; `dataclass` writes the boilerplate for you:
```python
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

    def __str__(self):
        return f"({self.x}, {self.y})"

p = Point(1, 2)
print(p)        # (1, 2)
p == Point(1, 2)  # True — dataclass adds __eq__
```

## exceptions
keys: exception, exceptions, try, except, try except, error handling, handle error, finally, raise, catch
```python
try:
    n = int(input("Number: "))
    print(10 / n)
except ValueError:
    print("That's not a number")
except ZeroDivisionError:
    print("Can't divide by zero")
finally:
    print("Done")

raise ValueError("age must be positive")   # signal your own error
```
Catch specific exceptions — a bare `except:` hides real bugs.

## indentation-error
keys: indentationerror, indentation error, indentation, indent, unexpected indent, expected an indented block, tabs vs spaces, tab
`IndentationError` means the spacing is inconsistent. Python uses indentation to define blocks:
```python
def hi():
    print("hi")      # 4 spaces inside the function
```
Fixes: use **4 spaces** everywhere, don't mix tabs and spaces, and make sure every line ending in `:` is followed by an indented block.

## syntax-error
keys: syntaxerror, syntax error, invalid syntax, eol while scanning, unterminated string, missing colon
`SyntaxError` means Python can't parse the line. Usual suspects:
- Missing `:` after `if`, `for`, `def`, `class`
- Unclosed quotes, brackets or parentheses (check the line **before** the error)
- Using `=` instead of `==` in a condition

## name-error
keys: nameerror, name error, is not defined, not defined, undefined variable
`NameError: name 'x' is not defined` means Python doesn't know that name yet. Check for:
- Typos (`pritn` vs `print`, `Name` vs `name` — case matters)
- Using a variable before assigning it
- A missing `import`

## type-error
keys: typeerror, type error, can only concatenate, unsupported operand, not callable, not subscriptable
`TypeError` means an operation got the wrong type:
```python
"Age: " + 25        # TypeError
"Age: " + str(25)   # fix
f"Age: {25}"        # nicer fix
```
Read the message — it names the types involved.

## key-index-error
keys: keyerror, key error, indexerror, index error, list index out of range, out of range
- `IndexError`: you asked for a position that doesn't exist — `[1, 2][5]`. Check `len()` first.
- `KeyError`: that key isn't in the dict — use `d.get("key")` or `if "key" in d:`.

## attribute-error
keys: attributeerror, attribute error, has no attribute, nonetype, object has no attribute
`AttributeError: 'NoneType' object has no attribute ...` usually means a function returned `None` (e.g. `lst = lst.sort()` — `sort()` returns `None`). Check what the variable actually holds with `print(type(x))`.

## module-not-found
keys: modulenotfounderror, module not found, no module named, importerror, import error
`ModuleNotFoundError` means the package isn't installed in the Python you're running. Install it with the same interpreter:
```bash
python3 -m pip install requests
```
If you use a virtual environment, activate it first.

## debugging
keys: debug, debugging, debugger, find bug, bug, bugs, traceback, stack trace, breakpoint
Read tracebacks **bottom-up** — the last line is the error, the lines above show where it happened. Then:
- `print()` variables to check assumptions
- Drop `breakpoint()` in your code to pause and inspect interactively
- Reproduce with the smallest possible example

## files
keys: file, files, read file, write file, open, open file, text file, csv, with open, save to file
Use `with` so files close automatically:
```python
with open("notes.txt", "w") as f:
    f.write("Hello\n")

with open("notes.txt") as f:
    for line in f:
        print(line.strip())
```
For CSV files, use the built-in `csv` module or pandas.

## json
keys: json, parse json, json loads, json dumps, serialize
```python
import json
data = json.loads('{"name": "Ada", "age": 36}')   # str → dict
text = json.dumps(data, indent=2)                  # dict → str

with open("data.json") as f:
    config = json.load(f)
```

## modules
keys: module, modules, import, importing, from import, standard library, own module
```python
import math
from random import choice
import datetime as dt

math.sqrt(16)        # 4.0
choice(["a", "b"])
```
Any `.py` file is a module — `import helpers` loads `helpers.py` from the same folder.

## pip
keys: pip, package, packages, library, libraries, install package, pip install, requirements, requirements txt, pypi
pip installs packages from PyPI:
```bash
python3 -m pip install requests
python3 -m pip freeze > requirements.txt
python3 -m pip install -r requirements.txt
```

## venv
keys: venv, virtual environment, virtual environments, virtualenv, environment, activate, conda
A virtual environment keeps each project's packages separate:
```bash
python3 -m venv .venv
source .venv/bin/activate      # macOS/Linux
.venv\Scripts\activate         # Windows
pip install requests
```
Run `deactivate` to leave it.

## random
keys: random, random number, randint, shuffle, choice, dice
```python
import random
random.randint(1, 6)          # dice roll
random.choice(["a", "b"])     # pick one
random.shuffle(my_list)       # in place
random.random()               # 0.0–1.0
```

## datetime
keys: datetime, timestamp, strftime, strptime, timedelta, time module, date module, work with dates, format date, parse date, date format, date formatting
```python
from datetime import datetime, timedelta
now = datetime.now()
now.strftime("%Y-%m-%d %H:%M")     # '2026-09-27 14:30'
tomorrow = now + timedelta(days=1)
```

## regex
keys: regex, regular expression, regular expressions, re module, pattern matching, match pattern
```python
import re
re.findall(r"\d+", "a1b22c333")               # ['1', '22', '333']
re.sub(r"\s+", " ", "too   many  spaces")     # 'too many spaces'
bool(re.fullmatch(r"[\w.]+@[\w.]+", "a@b.io"))
```

## match
keys: match statement, match case, switch, switch case, pattern matching statement
Python 3.10+ has `match` (like switch, but more powerful):
```python
match command.split():
    case ["go", direction]:
        move(direction)
    case ["quit"]:
        stop()
    case _:
        print("Unknown command")
```

## type-hints
keys: type hint, type hints, typing, annotation, annotations, mypy, static typing
```python
def greet(name: str, times: int = 1) -> str:
    return ", ".join([f"Hi {name}"] * times)

scores: dict[str, int] = {"Ada": 90}
```
Hints don't change runtime behaviour; tools like **mypy** or your editor use them to catch bugs early.

## async
keys: async, await, asyncio, asynchronous, concurrency, coroutine, threads, threading, parallel
`async`/`await` lets one thread juggle many waiting tasks (network calls, I/O):
```python
import asyncio

async def fetch(n):
    await asyncio.sleep(1)
    return n

async def main():
    results = await asyncio.gather(fetch(1), fetch(2), fetch(3))
    print(results)   # ~1s total, not 3s

asyncio.run(main())
```
For CPU-heavy work use `multiprocessing` instead.

## testing
keys: test, tests, testing, pytest, unittest, unit test, assert, tdd
```python
# test_math.py
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
```
Run `python3 -m pip install pytest` then `pytest` — it finds files named `test_*.py` automatically.

## requests-apis
keys: requests, api, apis, http, fetch data, get request, web request, rest api, call api
```python
import requests
r = requests.get("https://api.github.com/repos/python/cpython", timeout=10)
r.raise_for_status()
print(r.json()["stargazers_count"])
```
Install with `pip install requests`; always set a `timeout`.

## web-scraping
keys: scrape, scraping, web scraping, beautifulsoup, bs4, crawl, crawler
```python
import requests
from bs4 import BeautifulSoup

html = requests.get("https://example.com", timeout=10).text
soup = BeautifulSoup(html, "html.parser")
print(soup.title.text)
```
Check a site's terms and `robots.txt` first, and prefer an official API when there is one.

## web-dev
keys: web, website, web development, backend, flask, django, fastapi, server, web app
The big three Python web frameworks:
- **Flask** — minimal and flexible, great first framework
- **Django** — batteries included: admin, ORM, auth
- **FastAPI** — modern, fast APIs with type hints
```python
from flask import Flask
app = Flask(__name__)

@app.get("/")
def home():
    return "Hello from Flask!"
```

## data-science
keys: data, data science, data analysis, pandas, numpy, dataframe, excel, spreadsheet, matplotlib, plot, chart, jupyter
```python
import pandas as pd
df = pd.read_csv("sales.csv")
df.head()
df.groupby("region")["revenue"].sum()
df.plot(x="month", y="revenue")
```
Start with **pandas** and **matplotlib** in a Jupyter notebook — then NumPy and scikit-learn.

## ai-ml
keys: ai, machine learning, ml, deep learning, neural network, tensorflow, pytorch, scikit learn, sklearn, llm, chatgpt
Python is the main language for AI. A good order: **NumPy → pandas → scikit-learn** (classic ML) → **PyTorch** (deep learning). A first model:
```python
from sklearn.linear_model import LinearRegression
model = LinearRegression().fit(X_train, y_train)
model.score(X_test, y_test)
```

## automation
keys: automate, automation, script, scripts, rename files, excel automation, schedule, bot
Python shines at automating chores:
```python
from pathlib import Path
for i, p in enumerate(sorted(Path("photos").glob("*.jpg")), 1):
    p.rename(p.with_name(f"holiday_{i:03}.jpg"))
```
Other favourites: `openpyxl` for Excel, `smtplib` for email, `schedule` for recurring jobs.

## project-ideas
keys: project, projects, project idea, project ideas, what to build, practice, beginner projects, portfolio
Projects that teach a lot:
- **Beginner** — number guessing game, to-do list in the terminal, unit converter
- **Intermediate** — weather app using an API, web scraper, expense tracker with CSV
- **Advanced** — Flask/FastAPI web app, data dashboard, a Discord or Telegram bot
Pick something you'd actually use — motivation beats difficulty.

## pep8
keys: pep8, pep 8, style, style guide, clean code, formatting code, black, ruff, linter, best practice, best practices
Follow **PEP 8**, Python's style guide: 4-space indents, `snake_case` for functions and variables, `PascalCase` for classes, lines under ~88 characters. Let tools do it for you:
```bash
pip install ruff
ruff check . && ruff format .
```

## python2-vs-3
keys: python 2, python2, python 3, python3, versions, version difference
Use **Python 3**. Python 2 reached end of life in 2020 and gets no security updates. The latest 3.x release is the right choice for new code.

## fallback
keys:
I don't have an answer for that one yet. I'm best at Python topics — try asking about:
- `lists`, `dictionaries`, `loops`, `functions`, `classes`
- errors like `IndentationError` or `TypeError`
- `pip`, `virtual environments`, `f-strings`
- or our **courses** and **where to start**
You can also rephrase with a keyword, e.g. `how do I sort a list?`

import json

ELEMENTS = ['physical', 'gun', 'fire', 'ice', 'thunder', 'shock']
DEATHS = ['banish', 'curse']
STATUSES = ['bind', 'sleep', 'cold', 'confusion', 'poison']


def get_affinities(d, types, values):
    a = d['affinity']
    if type(types) is not list:
        types = [types]
    if type(values) is not list:
        values = [values]

    return len([k for k in a if k in types and a[k] in values])


def get_elem_reflect(d):
    return get_affinities(d, ELEMENTS, 'reflect')


def get_elem_absorb(d):
    return get_affinities(d, ELEMENTS, 'absorb')


def get_elem_reflect_or_absorb(d):
    return get_affinities(d, ELEMENTS, ['reflect', 'absorb'])


def get_elem_null(d):
    return get_affinities(d, ELEMENTS, ['null', 'reflect', 'absorb'])


def get_death_null(d):
    return get_affinities(d, DEATHS, ['null'])


def get_status_null(d):
    return get_affinities(d, STATUSES, ['null'])


def get_any_null(d):
    return get_affinities(d, ELEMENTS + DEATHS + STATUSES,
                          ['null', 'reflect', 'absorb'])


def get_affinities_weighted(d, item_weights):
    total = 0
    for (types, values, weight) in item_weights:
        score = get_affinities(d, types, values) * float(weight)
        total += score
    return total


def demo():
    demons = json.loads(open('demons.json').read())
    custom_weights = [(ELEMENTS, ['reflect', 'absorb'], 2),
                      (DEATHS, 'null', 1),
                      (STATUSES, 'null', 0.5),
                      (ELEMENTS, 'null', 0.5),
                      (DEATHS, 'protect', 0.5),
                      (STATUSES, 'protect', 0.1),
                      (ELEMENTS, 'protect', 0.25),
                      ]
    custom = lambda d: get_affinities_weighted(d, custom_weights)
    demons = sorted(demons, key=custom, reverse=True)
    for d in demons[:10]:
        print d['nameEN']


if __name__ == '__main__':
    demo()

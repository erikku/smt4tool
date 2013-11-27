import json
import operator

ELEMENTS = ['physical', 'gun', 'fire', 'ice', 'thunder', 'shock']
DEATHS = ['banish', 'curse']
STATUSES = ['bind', 'sleep', 'cold', 'confusion', 'poison']
CUSTOM_WEIGHTS = [(ELEMENTS, ['reflect', 'absorb'], 2),
                  (DEATHS, 'null', 1),
                  (STATUSES, 'null', 0.5),
                  (ELEMENTS, 'null', 0.5),
                  (DEATHS, 'protect', 0.5),
                  (STATUSES, 'protect', 0.1),
                  (ELEMENTS, 'protect', 0.25),
                  ]


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


get_custom = lambda d: get_affinities_weighted(d, CUSTOM_WEIGHTS)


def get_stat_build(d):
    stats = d['stats']
    if stats['magic'] > stats['luck'] > stats['strength']:
        return 'magic'
    elif stats['strength'] > stats['speed'] > stats['magic']:
        return 'strength'
    elif stats['speed'] > stats['strength'] > stats['magic']:
        return 'speed'
    else:
        if d['level'] >= 10:
            for stat in ['skill', 'magic', 'speed', 'luck']:
                assert stats[stat] == stats['strength']
        return 'balanced'


def get_level(d):
    return d['level']


def filter_demons(demons, function, op, value):
    if type(function) in [str, unicode]:
        function = globals()['get_' + function]
    if type(op) in [str, unicode]:
        op = getattr(operator, op)
    f = lambda d: op(function(d), value)
    return filter(f, demons)


def sort_demons(demons, key, reverse=False):
    if type(key) in [str, unicode]:
        key = globals()['get_' + key]
    return sorted(demons, key=key, reverse=reverse)


def demo():
    demons = json.loads(open('demons.json').read())
    demons = sorted(demons, key=get_custom, reverse=True)
    for d in demons[:10]:
        print d['nameEN']


def demo2():
    demons = json.loads(open('demons.json').read())
    demons = filter_demons(demons, 'elem_reflect_or_absorb', 'ge', 2)
    demons = filter_demons(demons, 'stat_build', 'eq', 'balanced')
    demons = sort_demons(demons, key='level')
    for d in demons:
        print d['nameEN'], d['level'], get_custom(d)
    print
    demons = sort_demons(demons, key='custom', reverse=True)
    for d in demons:
        print d['nameEN'], d['level'], get_custom(d)


if __name__ == '__main__':
    demo2()

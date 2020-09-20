import struct
import binascii


def parser(rawData, firmwareVersion):
    if (not(rawData) or not(firmwareVersion)):
        return

    parsedData = {}
    currentFirmware = firmware[firmwareVersion]

    if currentFirmware:
        for key in currentFirmware:
            firstChar = currentFirmware[key]['firstIndex']
            lastChar = currentFirmware[key]['lastIndex'] + 1
            data = rawData[firstChar:lastChar]

    parsedData[key] = currentFirmware[key]['parser'](data)

    return parsedData


def hexToDecimal(bytes):
    format = '>h'
    if len(bytes) < 4:
        format = '>b'
    data = binascii.unhexlify(bytes)
    return struct.unpack(format, data)[0]


def tempParser(bTemp):
    return ((175.72 * hexToDecimal(bTemp)) / 65536.0) - 46.85


def humParser(bHum):
    return ((125.0 * hexToDecimal(bHum)) / 65536.0) - 6.0


def pressParser(bPress):
    relPress = hexToDecimal(bPress[0:4])
    relPressSign = hexToDecimal(bPress[4:6])
    if (relPressSign == 0):
        relPress = -relPress
    ATM_PRESS = 101325

    return ATM_PRESS + relPress


def lumParser(blum):
    bLumBlue = hexToDecimal(blum[0:4])
    bLumRed = hexToDecimal(blum[4:8])
    return (bLumBlue + bLumRed) / 2


def battParser(bBatteryLevel):
    return hexToDecimal(bBatteryLevel)


firmware = {
    '1.0': {
        'temp': {
            'firstIndex': 0,
            'lastIndex': 3,
            'parser': tempParser,
        },
        'humidity': {
            'firstIndex': 4,
            'lastIndex': 7,
            'parser': humParser,
        },
        'pressure': {
            'firstIndex': 8,
            'lastIndex': 13,
            'parser': pressParser,
        },
        'luminosity': {
            'firstIndex': 14,
            'lastIndex': 21,
            'parser': lumParser,
        },
        'batteryLevel': {
            'firstIndex': 22,
            'lastIndex': 23,
            'parser': battParser,
        },
    }
}

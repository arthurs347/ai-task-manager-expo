import {convertDurationTimeToMinutes} from "@/utils/dateUtils";
import {Time} from "@internationalized/date";
import {TimeValue} from "@react-types/datepicker";

describe('convertDurationTimeToMinutes', () => {
    test('should convert hours and minutes to total minutes', () => {
        const duration: TimeValue = new Time(1, 30); // 1 hour and 30 minutes
        const result = convertDurationTimeToMinutes(duration);
        expect(result).toBe(90);
    })
})
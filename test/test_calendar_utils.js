var c = require('../src/common/calendar_utils');
var chai = require('chai');

var expect = chai.expect;

describe('Calendar Utils', function () {
    var d1 = c.make_date(2016, 4, 1),
        d2 = c.make_date(2016, 3, 8),
        d3 = c.make_date(2016, 3, 15),
        d4 = c.make_date(2016, 4, 1),
        d5 = c.make_date(2015, 6, 1),
        d6 = c.make_date(2016, 3, 12);

    describe('Compare Date', function () {
        it('by Date', function () {
            expect(c.compare_date(d1, d2)).to.equal(1);
            expect(c.compare_date(d2, d3)).to.equal(-1);
            expect(c.compare_date(d1, d4)).to.equal(0);
        });

        it('by Month', function () {
            expect(c.compare_month(d1, d2)).to.equal(1);
            expect(c.compare_month(d2, d3)).to.equal(0);
            expect(c.compare_month(d3, d4)).to.equal(-1);
        });

        it('by Year', function () {
            expect(c.compare_year(d1, d2)).to.equal(0);
            expect(c.compare_year(d1, d5)).to.equal(1);
            expect(c.compare_year(d5, d1)).to.equal(-1);
        });
    });

    describe('Date in Range', function () {
        var r_btm = [d3, null],
            r_top = [null, d3],
            r_mid = [d2, d3];

        it('with only upper bound', function () {
            expect(c.date_in_range(d1, r_btm)).to.equal(true);
            expect(c.date_in_range(d2, r_btm)).to.equal(false);
        });

        it('with only lower bound', function () {
            expect(c.date_in_range(d1, r_top)).to.equal(false);
            expect(c.date_in_range(d2, r_top)).to.equal(true);
        });

        it('with both bound', function () {
            expect(c.date_in_range(d1, r_mid)).to.equal(false);
            expect(c.date_in_range(d6, r_mid)).to.equal(true);
        });
    });

    describe('Leap Year', function () {
        var new_year = function (year) {
            return c.make_date(year, 1, 1);
        };

        it('plain year', function () {
            expect(c.is_leap_year(new_year(2013))).to.equal(false);
            expect(c.is_leap_year(new_year(1999))).to.equal(false);
        });

        it('year % 4 = 0', function () {
            expect(c.is_leap_year(new_year(2008))).to.equal(true);
            expect(c.is_leap_year(new_year(2016))).to.equal(true);
        });

        it('year % 100 = 0', function () {
            expect(c.is_leap_year(new_year(1900))).to.equal(false);
            expect(c.is_leap_year(new_year(2100))).to.equal(false);
        });

        it('year % 400 = 0', function () {
            expect(c.is_leap_year(new_year(2000))).to.equal(true);
            expect(c.is_leap_year(new_year(1600))).to.equal(true);
        });
    });

    describe('Days of Month', function () {
        it('normal month', function () {
            expect(c.days_of_month(c.make_date(2016, 4, 1))).to.equal(30);
            expect(c.days_of_month(c.make_date(2016, 1, 1))).to.equal(31);
        });

        it('leap month', function () {
            expect(c.days_of_month(c.make_date(2016, 2, 1))).to.equal(29);
        });
    });

    describe('Normalize Date', function () {
        it('Day out of upper bound', function () {
            var da = c.make_date(2016, 3, 33),
                db = c.make_date(2016, 4, 2);

            expect(c.date_equal(c.normalize(da), db)).to.equal(true);
        });

        it('Day out of lower bound', function () {
            var da = c.make_date(2016, 3, 0),
                db = c.make_date(2016, 2, 29);

            expect(c.date_equal(c.normalize(da), db)).to.equal(true);
        });

        it('Month out of upper bound', function () {
            var da = c.make_date(2015, 13, 3),
                db = c.make_date(2016, 1, 3);

            expect(c.date_equal(c.normalize(da), db)).to.equal(true);
        });

        it('Month out of lower bound', function () {
            var da = c.make_date(2016, -1, 11),
                db = c.make_date(2015, 11, 11);

            expect(c.date_equal(c.normalize(da), db)).to.equal(true);
        });

        it('Both day and month out of bound', function () {
            var da = c.make_date(2015, 14, 30),
                db = c.make_date(2016, 3, 1);

            expect(c.date_equal(c.normalize(da), db)).to.equal(true);
        });
    });

    describe('Padding Month Dates', function () {
        it('Padding Head', function () {
            var list = c.padding_month_dates(c.make_date(2016, 12, 10));

            expect(list).to.have.length(35);
            expect(c.date_equal(list[0], c.make_date(2016, 11, 27))).to.equal(true);
            expect(c.date_equal(list[list.length - 1] , c.make_date(2016, 12, 31))).to.equal(true);
        });

        it('Padding Tail', function () {
            var list = c.padding_month_dates(c.make_date(2017, 1, 10));

            expect(list).to.have.length(35);
            expect(c.date_equal(list[0], c.make_date(2017, 1, 1))).to.equal(true);
            expect(c.date_equal(list[list.length - 1] , c.make_date(2017, 2, 4))).to.equal(true);
        });

        it('Padding both Head & Tail', function () {
            var list = c.padding_month_dates(c.make_date(2016, 10, 10));

            expect(list).to.have.length(42);
            expect(c.date_equal(list[0], c.make_date(2016, 9, 25))).to.equal(true);
            expect(c.date_equal(list[list.length - 1] , c.make_date(2016, 11, 5))).to.equal(true);
        });
    });

});

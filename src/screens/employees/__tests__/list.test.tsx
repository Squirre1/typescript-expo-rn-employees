import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { ListItem } from 'react-native-elements'

import { mount } from 'enzyme'
import * as chai from 'chai'

import EmployeesList from '../list'

import { ObservableListStore } from '../../../mobx/employees'

const store = new ObservableListStore()
const newEmployer1 = { id: 1, name: 'aaa', surname: 'aaa', position: 'aaa', avatar: '' }
const newEmployer2 = { id: 2, name: 'bbb', surname: 'bbb', position: 'bbb', avatar: '' }

const mockGetStore = () => store
const mockSetStore = (key: string, value: any) => { store[key] = value }

jest.mock('../../../firebase', () => {
  return ({
      database: {
        ref: () => ({
          on: () => ({ }),
          set: (value) => {
            const employees = mockGetStore().employees
            mockSetStore('employees', [ ...employees, value ])
          },
          child: (value) => ({
            remove: () => {
              const employees = mockGetStore().employees
              mockSetStore('employees', employees.filter(employer => employer.id != value ))
            }
          })
        })
      },
      storage: () => {}
  })
});

describe("List of employees", () => {

  it("constructor should contain employees, loading and error props", () => {
    expect(store.employees).toEqual([])
    expect(store.loading).toEqual(false)
    expect(store.error).toEqual('')
  })

  it("add employer to list", async () => {
    let wrapper = mount(<EmployeesList store={store} />)

    await store.addEmployer(newEmployer1)
    await store.addEmployer(newEmployer2)

    wrapper = wrapper.update()
    chai.expect(wrapper.find(ListItem)).to.have.length(2)
  })


  it("remove employer from list", async () => {
    let wrapper = mount(<EmployeesList store={store} />)

    await store.removeEmployer('2')
    wrapper = wrapper.update()

    chai.expect(wrapper.find(ListItem)).to.have.length(1)
  })
})



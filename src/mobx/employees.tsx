import { observable, action } from 'mobx'
import { database, storage } from '../firebase'
import { Employer } from '../types/Employer'

class ObservableListStore {

  @observable
  error: string

  @observable
  loading: boolean

  @observable
  employees: Employer[] = []

  constructor() {
    this.error = ''
    this.loading = false

    database.ref('/employees/').on('value', (snapshot: any) => {
      this.employees = Object.values(snapshot.val())
    });
  }

  @action
  removeEmployer = (employerId: string) => new Promise((resolve) => {
    database.ref('/employees/').child(employerId).remove();
    resolve()
  })

  @action
  addEmployer = ({ avatar, ...employer }: Employer) => new Promise(async (resolve) => {
    try {

      if (!employer.name.trim() || !employer.surname.trim()) {
        throw 'name and surname are required'
      }

      this.loading = true

      const employerId = employer.id || Date.now()
      const employerObj = { ...employer, id: employerId, avatar: '' }

      if (avatar && avatar.uri) {
        try {
          const response = await fetch(avatar.uri)
          const blob = await response.blob()
          const ref = storage.ref().child(`image/${employerId}`)

          await ref.put(blob)
          const uri: string = await ref.getDownloadURL()

          employerObj.avatar = uri
        } catch (error) {
          throw 'upload image error'
        }
      }

      database.ref(`/employees/${employerId}`).set(employerObj);

      this.error = ''
      resolve()
    } catch (error) {
      this.error = error
      this.loading = false
    } finally {
      this.loading = false
    }
  })

}

export { ObservableListStore }

const observableListStore = new ObservableListStore()
export default observableListStore

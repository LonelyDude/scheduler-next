'use client';
import {useState, useEffect, useRef, useReducer} from 'react'
import {useRouter} from 'next/navigation';
import tw from 'tailwind-styled-components';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import AddToDos from '@mui/icons-material/AddBoxOutlined';
import ToDoCheckboxActive from '@mui/icons-material/CheckBox';
import ToDoCheackboxDeactive from '@mui/icons-material/CheckBoxOutlineBlank';
import LastMonth from '@mui/icons-material/ChevronLeftRounded';
import NextMonth from '@mui/icons-material/ChevronRightRounded';
import CollapseIcon from '@mui/icons-material/ExpandMoreRounded';
import AddIcon from '@mui/icons-material/AddRounded';
import OptionsIcon from '@mui/icons-material/TuneRounded';
import NotifierIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import TimeIcon from '@mui/icons-material/AccessTimeRounded';
import GuestIcon from '@mui/icons-material/PeopleAltOutlined';
import LocationIcon from '@mui/icons-material/LocationOnOutlined';
import DescriptionIcon from '@mui/icons-material/SortSharp';
import DeleteIcon from '@mui/icons-material/DeleteRounded';



export default function CalendarPage({}) {

  const router = useRouter()
  const initialState = []
  const taskReducer = (tasks, action) => {
    switch (action.type) {
      case "ADD_TASK":
        return [...tasks, action.task]
    }
  }
  const inputRef = useRef(null)
  
  const addTask = () => {
    let task = {
      text: inputRef.current.value,
      complete: false
    }
    dispatch({
      type: 'ADD_TASK',
      task
    })
  }

  const [date, setDate] = useState(new Date())
  const [currentDate, setCurrentDate] = useState('')
  const [popUpStatus, setPopUpStatus] = useState(false)
  const [currentTitle, setCurrentTitle] = useState('')

  const [event, setEvent] = useState('')
  const [tasks, dispatch] = useReducer(taskReducer, initialState)

  function toggleStatus (status, setStatus) {
    let arr = [false, true]
    console.log(arr)
    arr = arr.filter((item) => item!==status)
    console.log(arr)
    setStatus(arr[0])
    // console.log('Status: ', status)
  }

  useEffect(() => {
    // get the current date and store it into a string
    function newCurrentDate () {
      const time = new Date()
      const month = time.getMonth()
      const day = time.getDate()
      const year = time.getFullYear()
      const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

      let dateString = `${monthArr[month]} ${day}, ${year}`

      return dateString
    }
    setCurrentDate(newCurrentDate())
  }, [date, setCurrentDate])

  // let data = inputRef.current.value;

  // console.log(`inputRef: ${inputRef}\ntasks: ${tasks}\ndata:${data}`)

  function setNewEvent (eventName) {
    setEvent(eventName)
    console.log(event)
    setPopUpStatus(false)
  }

  function resetEvent () {
    setEvent('')
  }

  // console.log(currentDate)

  return (
    <HomeContainer>
      {/* <Link href='/dashboard'>
        <RedirectButton>Go to Dashboard</RedirectButton>
      </Link> */}
      <Sidebar>
        <MonthCalendar>
          <PanelHeader>
              <PanelTitle>Date</PanelTitle>
              <MonthCalendarHeaderLeft>
                <LastMonth className='text-black w-[3rem] h-[3rem] cursor-pointer'/>
                <NextMonth className='text-black w-[3rem] h-[3rem] cursor-pointer'/>
              </MonthCalendarHeaderLeft>
          </PanelHeader>
          <CalendarContainer>
            <Calendar onChange={setDate} value={date} className='w-full h-full border-none font-semibold '/>
          </CalendarContainer>
          {/* <div className='w-full h-full bg-green-500'></div> */}
        </MonthCalendar>
        <ToDo>
          <PanelHeader>
              <PanelTitle>Scheduled</PanelTitle>
              <AddToDos className='text-black w-[2.5rem] h-[2.5rem] cursor-pointer'/>
          </PanelHeader>
          <ToDoItems>
            <ToDoItem>
              <ToDoCheackboxDeactive className='text-[#000000] w-[2rem] h-[2rem] cursor-pointer' id=''/>
              <ToDoName>Holiday</ToDoName>
            </ToDoItem>
            <ToDoItem>
              <ToDoCheckboxActive className='text-[#6389ff] w-[2rem] h-[2rem] cursor-pointer' id=''/>
              <ToDoName>Reminders</ToDoName>
            </ToDoItem>
            <ToDoItem>
              <ToDoCheckboxActive className='text-[#6389ff] w-[2rem] h-[2rem] cursor-pointer' id=''/>
              <ToDoName>Task</ToDoName>
            </ToDoItem>
          </ToDoItems>
          <OtherToDos><AddIcon className='w-[2rem] h-[2rem] mr-[0.8rem]'/>Other</OtherToDos>
        </ToDo>
        <Starred>
          <PanelHeader>
              <PanelTitle>Starred</PanelTitle>
              <CollapseIcon className='text-black w-[3rem] h-[3rem] cursor-pointer'/>
          </PanelHeader>
          <StarredItems>
            <StarredItem>
              <StarredItemColor className='bg-[#6661b0]'/>
              <StarredItemName>Meeting Call</StarredItemName>
            </StarredItem>
            <StarredItem>
              <StarredItemColor className='bg-[#81a2eb]'/>
              <StarredItemName>Kick-off meeting with project team</StarredItemName>
            </StarredItem>
            <StarredItem>
              <StarredItemColor className='bg-[#f185c5]'/>
              <StarredItemName>Develop and maintain design</StarredItemName>
            </StarredItem>
          </StarredItems>
        </Starred>
      </Sidebar>
      <DayCalendar>
        <DayCalendarHeader>
          <DayCalendarHeaderLeft>
            <DayCalendarTitle>{currentDate}</DayCalendarTitle>
            <DayCalendarMonthToggle>
              <LastMonth className='text-black w-[3rem] h-[3rem] cursor-pointer'/>
              <NextMonth className='text-black w-[3rem] h-[3rem] cursor-pointer'/>
            </DayCalendarMonthToggle>
          </DayCalendarHeaderLeft>
          <DayCalendarHeaderRight>
            <DayCalendarDisplayChanger>Week<CollapseIcon className='w-[2.3rem] h-[2.3rem] ml-[1rem] mb-1'/></DayCalendarDisplayChanger>
            <DayCalendarEventAdder onClick={() => setPopUpStatus(true)}><AddIcon className='w-[2.3rem] h-[2.3rem] mr-[1rem] mb-1'/>Add</DayCalendarEventAdder>
          </DayCalendarHeaderRight>
        </DayCalendarHeader>
        <DayCalendarSemiHeader>
          <DayCalendarSemiHeaderLeft>
            <ScheduledDisplaySelect>
              <ScheduledDisplaySelection>All</ScheduledDisplaySelection>
              <ScheduledDisplaySelectSeperator/>
              <ScheduledDisplaySelection><NotifierIcon className='w-[0.8rem] h-[0.8rem] mr-[0.5rem]'/>Backlog</ScheduledDisplaySelection>
              <ScheduledDisplaySelection>Active</ScheduledDisplaySelection>
              <ScheduledDisplaySelection>Closed</ScheduledDisplaySelection>
            </ScheduledDisplaySelect>
            <ScheduledFilter>
              <AddIcon className='w-[2.5rem] h-[2.5rem]'/>
              Filter
            </ScheduledFilter>
          </DayCalendarSemiHeaderLeft>
          <ScheduledViewSelect>
            <OptionsIcon className='w-[2.5rem] h-[2.5rem] mr-[0.8rem]'/>
            View
              <CollapseIcon className='ml-[0.8rem] w-[2.5rem] h-[2.5rem]'/>
          </ScheduledViewSelect>
        </DayCalendarSemiHeader>
        <DayCalendarMain>
          <DayCalendarMainHorizontalAxis>
            <DayCalendarMainGapFiller/>
            <DayCalendarMainHorizontalAxisMain>
              <DayCalendarMainHorizontalItem>
                <DayCalendarMainHorizontalItemDate>19</DayCalendarMainHorizontalItemDate>
                <DayCalendarMainHorizontalItemDay>Sunday</DayCalendarMainHorizontalItemDay>
              </DayCalendarMainHorizontalItem>
              <DayCalendarMainHorizontalItem>
                <DayCalendarMainHorizontalItemDate>20</DayCalendarMainHorizontalItemDate>
                <DayCalendarMainHorizontalItemDay>Monday</DayCalendarMainHorizontalItemDay>
              </DayCalendarMainHorizontalItem>
              <DayCalendarMainHorizontalItem>
                <DayCalendarMainHorizontalItemDate>21</DayCalendarMainHorizontalItemDate>
                <DayCalendarMainHorizontalItemDay>Tuesday</DayCalendarMainHorizontalItemDay>
              </DayCalendarMainHorizontalItem>
              <DayCalendarMainHorizontalItem>
                <DayCalendarMainHorizontalItemDate>22</DayCalendarMainHorizontalItemDate>
                <DayCalendarMainHorizontalItemDay>Wednesday</DayCalendarMainHorizontalItemDay>
              </DayCalendarMainHorizontalItem>
              <DayCalendarMainHorizontalItem>
                <DayCalendarMainHorizontalItemDate>23</DayCalendarMainHorizontalItemDate>
                <DayCalendarMainHorizontalItemDay>Thursday</DayCalendarMainHorizontalItemDay>
              </DayCalendarMainHorizontalItem>
              <DayCalendarMainHorizontalItem>
                <DayCalendarMainHorizontalItemDate>24</DayCalendarMainHorizontalItemDate>
                <DayCalendarMainHorizontalItemDay>Friday</DayCalendarMainHorizontalItemDay>
              </DayCalendarMainHorizontalItem>
              <DayCalendarMainHorizontalItem>
                <DayCalendarMainHorizontalItemDate>25</DayCalendarMainHorizontalItemDate>
                <DayCalendarMainHorizontalItemDay>Saturday</DayCalendarMainHorizontalItemDay>
              </DayCalendarMainHorizontalItem>
            </DayCalendarMainHorizontalAxisMain>
          </DayCalendarMainHorizontalAxis>
          <DayCalendarMainVerticalAxis>
            <DayCalendarMainGapFiller/>
            <DayCalendarMainVerticalAxisMain>
              <DayCalendarMainTimeSelect>
                7:30
                {event ? 
                <DayCalendarMainTimeSelectEvent>
                  {event}
                  <DeleteIcon className='w-[1rem] h-[1rem] cursor-pointer' onClick={() => resetEvent()}/>
                </DayCalendarMainTimeSelectEvent>
                :
                <></>
                }
              </DayCalendarMainTimeSelect>
              <DayCalendarMainVerticalItem>
                7 AM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                8 AM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                9 AM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                10 AM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                11 AM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                12 PM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                1 PM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                2 PM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                3 PM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                4 PM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                5 PM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                6 PM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                7 PM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                8 PM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                9 PM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                10 PM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                11 PM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                0 AM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                2 AM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                3 AM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                4 AM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                5 AM
              </DayCalendarMainVerticalItem>
              <DayCalendarMainVerticalItem>
                6 AM
              </DayCalendarMainVerticalItem>
            </DayCalendarMainVerticalAxisMain>
          </DayCalendarMainVerticalAxis>
          <DayCalendarMainGrid>
            <DayCalendarMainGridItemVariant/>
            <DayCalendarMainGridItemVariant/>
            <DayCalendarMainGridItemVariant/>
            <DayCalendarMainGridItemVariant/>
            <DayCalendarMainGridItemVariant/>
            <DayCalendarMainGridItemVariant/>
            <DayCalendarMainGridItemVariant/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItem/>
            <DayCalendarMainGridItemVariant/>
            <DayCalendarMainGridItemVariant/>
            <DayCalendarMainGridItemVariant/>
            <DayCalendarMainGridItemVariant/>
            <DayCalendarMainGridItemVariant/>
            <DayCalendarMainGridItemVariant/>
            <DayCalendarMainGridItemVariant/>
          </DayCalendarMainGrid>
        </DayCalendarMain>
      </DayCalendar>
      {popUpStatus ?
      <PopUp>
        <PopUpClose onClick={() => setPopUpStatus(false)}><CloseIcon className='w-[2rem] h-[2rem] text-[#3d4043]'/></PopUpClose>
        <PopUpMain>
          <PopUpMainItem>
            <PopUpMainItemTitle placeholder='Add title' value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') {addTask(currentTitle)}}} ref={inputRef}/>
            <PopUpMainItemTypes>
              <PopUpMainItemTypesSelected>Event</PopUpMainItemTypesSelected>
              <PopUpMainItemTypesSelect>Task</PopUpMainItemTypesSelect>
            </PopUpMainItemTypes>
          </PopUpMainItem>
          <PopUpMainInfo>
            <TimeIcon className='w-[2.4rem] h-[2.4rem] text-[#606368] absolute left-[1.8rem]'/>
            <PopUpMainInfoText>
              <PopUpMainInfoTextTitle>{currentDate}</PopUpMainInfoTextTitle>
              <PopUpMainInfoTextSubTitle>Time zone | Does not repeat</PopUpMainInfoTextSubTitle>
            </PopUpMainInfoText>
          </PopUpMainInfo>
          <PopUpMainInfo>
            <GuestIcon className='w-[2.4rem] h-[2.4rem] text-[#606368] absolute left-[1.8rem]'/>
            <PopUpMainInfoText>
              <PopUpMainInfoTextAltTitle placeholder='Add guests'></PopUpMainInfoTextAltTitle>
            </PopUpMainInfoText>
          </PopUpMainInfo>
          <PopUpMainInfo>
            <LocationIcon className='w-[2.4rem] h-[2.4rem] text-[#606368] absolute left-[1.8rem]'/>
            <PopUpMainInfoText>
              <PopUpMainInfoTextAltTitle placeholder='Add location'></PopUpMainInfoTextAltTitle>
            </PopUpMainInfoText>
          </PopUpMainInfo>
          <PopUpMainInfo>
            <DescriptionIcon className='w-[2.4rem] h-[2.4rem] text-[#606368] absolute left-[1.8rem]'/>
            <PopUpMainInfoText>
              <PopUpMainInfoTextAltTitle placeholder='Add description or attachments'></PopUpMainInfoTextAltTitle>
            </PopUpMainInfoText>
          </PopUpMainInfo>
          <PopUpMainBottom>
            <PopUpMainBottomMore>More options</PopUpMainBottomMore>
            <PopUpMainBottomSave onClick={() => dispatch({type: 'ADD_TASK'})}>Save</PopUpMainBottomSave>
          </PopUpMainBottom>
        </PopUpMain>
      </PopUp>
      :
      <>
      </>
      }
    </HomeContainer>
  )
}


const HomeContainer = tw.main`w-screen h-[100%] flex flex-row justify-between bg-[#f3f8ff] box-border relative`;
// const RedirectButton = tw.button`border-none bg-white text-black w-64 h-8 rounded-md hover:bg-gray-200`;



const Sidebar = tw.section`w-[25%] h-full p-8`

const CalendarContainer = tw.div`w-full h-full mt-[1rem]`
const MonthCalendar = tw.div`bg-white w-full h-auto rounded-lg px-[4%] pb-[2rem]`
const MonthCalendarHeaderLeft = tw.div`w-[8rem] flex flex-row justify-between`

const ToDo = tw.div`bg-white w-full h-auto rounded-lg mt-4 pb-8 px-[4%]`
const ToDoItems = tw.div`w-full h-auto`
const ToDoItem = tw.div`w-auto h-[3rem] flex flex-row items-center mt-[1.2rem]`
// const ToDoCheckbox = tw.input`w-[1rem] h-[1rem]`
const ToDoName = tw.span`text-black ml-[0.6rem] text-[1.5rem] font-medium cursor-pointer`
const OtherToDos = tw.span`text-[#6389ff] flex flex-row items-center text-[1.4rem] mt-[1rem] cursor-pointer w-[8rem]`

const Starred = tw.div`bg-white w-full h-auto rounded-lg mt-4 pb-8 px-[4%]`
const StarredItems = tw.div`w-full h-auto`
const StarredItem = tw.div`w-auto h-[3rem] flex flex-row items-center mt-[1.2rem]`
const StarredItemColor = tw.div`w-[1.5rem] h-[1.5rem] rounded-md cursor-pointer`
const StarredItemName = tw.span`text-black ml-[0.6rem] text-[1.5rem] font-medium cursor-pointer`

const PanelHeader = tw.div`h-[20%] w-full pt-8 flex flex row justify-between`
const PanelTitle = tw.span`text-black text-[2.2rem] font-semibold cursor-default`



const DayCalendar = tw.section`w-[75%] h-[100%] bg-white`

const DayCalendarHeader = tw.header`h-[10%] flex items-center justify-between flex-row w-full px-[1.6rem] border-bottom border-b-2 border-[#dfdfdf]`
const DayCalendarHeaderLeft = tw.div`flex flex-row`
const DayCalendarTitle = tw.div`text-black text-5xl mr-[1.5rem] font-semibold cursor-default`
const DayCalendarMonthToggle = tw.div`w-[8rem] flex flex-row justify-between items-center`
const DayCalendarHeaderRight = tw.div`flex flex-row justify-between`
const DayCalendarDisplayChanger = tw.button`w-[12rem] h-[4.5rem] bg-[#f3f8ff] text-[#6389ff] text-[1.8rem] rounded-lg border-[3px] border-[#81a2eb] font-semibold`
const DayCalendarEventAdder = tw.button`w-[10rem] h-[4.5rem] bg-[#e6ebf2] text-white text-[1.8rem] rounded-lg bg-[#6389ff] font-semibold ml-4 border-[3px] border-[#527ee5]`

const DayCalendarSemiHeader = tw.div`w-full h-[10%] flex flex-row justify-between items-center px-[1.6%]`
const DayCalendarSemiHeaderLeft = tw.div`w-[40%] h-full flex flex-row items-center justify-between`
const ScheduledDisplaySelect = tw.div`w-auto h-[4.1rem] rounded-2xl border-[3px] border-[#81a2eb] bg-[#f3f8ff] flex flex-row items-center px-[0.4rem]`
const ScheduledDisplaySelection = tw.span`w-auto h-auto mx-[2rem] flex flex-row items-center justify-center text-[#81a2eb] text-[1.5rem] font-[625] cursor-pointer hover:bg-[#5a85e6] hover:text-[#ffffff] hover:border-y-[0.5rem] hover:border-x-[1rem] hover:mx-[1rem] hover:border-[#5a85e6] hover:rounded-lg`
const ScheduledDisplaySelectSeperator = tw.div`w-[4px] h-[60%] bg-[#81a2eb]`
const ScheduledFilter = tw.div`w-[8rem] h-[4.1rem] bg-[#ffffff] rounded-2xl border-[3px] border-[#81a2eb] border-dotted text-[#81a2eb] flex items-center justify-between text-[1.5rem] font-semibold px-[1.4%] cursor-pointer`
const ScheduledViewSelect = tw.div`w-auto h-[4.1rem] bg-[#ffffff] rounded-2xl border-[3px] border-[#81a2eb] text-[#81a2eb] flex items-center justify-center px-[1%] cursor-pointer text-[1.5rem] font-semibold`

const DayCalendarMain = tw.div`w-full h-[80%] relative bg-white overflow-y-scroll pl-[1.6%] mb-[2rem]`
const DayCalendarMainGapFiller = tw.div`w-[12rem] h-[12rem] border-b-[1px] border-r-[1px] border-[#838281]`
const DayCalendarMainHorizontalAxis = tw.div`w-auto h-[12rem] border-b-[1px] border-[#838281] absolute rounded-t-2xl bg-[#f3f8ff] flex flex-row left-[1.6%]`
const DayCalendarMainHorizontalAxisMain = tw.div`w-max h-[12rem] grid grid-cols-7`
const DayCalendarMainHorizontalItem = tw.div`w-[12rem] h-[12rem] mx-[1.2rem] flex flex-col items-center justify-center`
const DayCalendarMainHorizontalItemDate = tw.span`text-[#838281] text-[3.5rem] font-semibold cursor-default`
const DayCalendarMainHorizontalItemDay = tw.span`text-[#838281] text-[2rem] font-semibold cursor-default`
const DayCalendarMainVerticalAxis = tw.div`w-[12rem] h-max border-r-[1px] border-[#838281] absolute rounded-l-2xl bg-[#f3f8ff] flex flex-col left-[1.6%]`
const DayCalendarMainVerticalAxisMain = tw.div`w-[12rem] h-max flex flex-col relative items-center`
const DayCalendarMainVerticalItem = tw.div`w-full h-[3rem] my-[3rem] text-[#6389ff] flex flex-row items-center justify-center text-[1.8rem] font-semibold cursor-default`
const DayCalendarMainTimeSelect = tw.div`absolute w-[8rem] h-[2.8rem] bg-[#6389ff] rounded-full text-white flex flex-row items-center justify-center text-[1.8rem] font-semibold cursor-default top-[7.8rem]`
const DayCalendarMainTimeSelectEvent = tw.div`absolute text-[#ffffff] text-[1.2rem] px-[0.8rem] left-[10.2rem] bottom-[3.8rem] rounded-lg flex flex-row justify-between items-center bg-[#6d8bfe] w-[14rem] h-[2rem]`
const DayCalendarMainGrid = tw.div`w-auto h-auto pl-[12rem] pt-[3rem] rounded-[1rem] grid grid-cols-7 pr-[2.2%] gap-0 mb-[2rem]`
const DayCalendarMainGridItem = tw.div`w-[14.4rem] h-[9rem] border-b-[1px] border-r-[1px] border-[#838281]`
const DayCalendarMainGridItemVariant = tw.div`w-[14.4rem] h-[4.5rem] border-b-[1px] border-r-[1px] border-[#838281]`


const PopUp = tw.div`w-[56rem] h-[72rem] rounded-[3rem] absolute bg-white z-50 [transform:translate(-50%,-50%);] top-[50%] left-[50%] shadow-[60rem_60rem_60rem_60rem_rgba(0,0,0,0.3)] px-[2%] py-[4%]`
const PopUpClose = tw.div`w-[3rem] h-[3rem] rounded-full bg-[rgba(0,0,0,0.05)] absolute top-[2rem] right-[2rem] flex items-center justify-center cursor-pointer`
const PopUpMain = tw.div`w-full h-full flex flex-col justify-start items-center`
const PopUpMainItem = tw.div`w-full h-[16%] px-[12%] flex flex-col items-center justify-between mb-[1rem]`
const PopUpMainItemTitle = tw.input`w-full h-[4rem] border-b-[4px] border-[#dadce0] focus:border-[#527ee5] outline-none text-[2.5rem] placeholder:text-[#606368] text-[#3d4043]`
const PopUpMainItemTypes = tw.div`w-full h-[4rem] flex flex-row justfy-start items-center`
const PopUpMainItemTypesSelect = tw.div`w-auto h-[4rem] rounded-[0.6rem] flex items-center justify-center text-[1.8rem] px-[2%] cursor-pointer mr-[1rem] bg-white hover:bg-[#f5f5f5] text-[#606368]`
const PopUpMainItemTypesSelected = tw.div`w-auto h-[4rem] rounded-[0.6rem] flex items-center justify-center text-[1.8rem] px-[2%] cursor-pointer mr-[1rem] bg-[#e9f0fe] hover:bg-[#e2ecfd] text-[#3469d1]`
const PopUpMainInfo = tw.div`w-full h-[5rem] mt-[0.8rem] flex flex-row items-center justify-between px-[11%] relative`
const PopUpMainInfoText = tw.div`w-full h-[5rem] flex flex-col items-center justify-between cursor-pointer hover:bg-[#f5f5f5] rounded-[0.6rem] px-[1%]`
const PopUpMainInfoTextTitle = tw.span`w-full h-[50%] text-[1.8rem] text-[#3d4043] font-[550] flex flex-row items-center`
const PopUpMainInfoTextSubTitle = tw.span`w-full h-[50%] text-[1.6rem] text-[#606368] font-[400] flex flex-row items-center`
const PopUpMainInfoTextAltTitle = tw.input`w-full h-[100%] text-[1.9rem] text-[#606368] font-[400] flex flex-row items-center bg-transparent cursor-pointer outline-none border-b-[4px] border-transparent focus:border-[#527ee5] focus:cursor-text`
const PopUpMainBottom = tw.div`w-full h-[4rem] absolute bottom-[2rem] flex flex-row items-center justify-end pr-[4%]`
const PopUpMainBottomMore = tw.div`w-auto h-[4rem] px-[2%] text-[1.8rem] text-[#3d4043] font-[550] flex flex-row justify-center items-center rounded-[0.8rem] hover:bg-[#f9f9f9] cursor-pointer`
const PopUpMainBottomSave = tw.div`w-auto h-[4rem] px-[4%] text-[1.8rem] text-[#ffffff] font-[550] flex flex-row justify-center items-center rounded-[0.8rem] hover:bg-[#3667c8] cursor-pointer bg-[#3a75e7] ml-[1rem]`
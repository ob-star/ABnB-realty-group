import React from 'react'

function Topic({topTopics}) {
  return (
    <div>
          <div className=" p-4 mb-6">
            <h2 className="text-xl font-bold mb-4">Top Topics</h2>
            <ul className="space-y-2">
              {topTopics.map((topic, index) => (
                <li key={index} className="text-blue-600 hover:underline">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
    </div>
  )
}

export default Topic

package com.example.myapplication.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.R
import com.example.myapplication.data.ConcernItem
import kotlinx.android.synthetic.main.item_row_concerns.view.*

class ConcernItemAdapter(var context: Context, var list: ArrayList<ConcernItem>) :
  RecyclerView.Adapter<RecyclerView.ViewHolder>() {

  override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
     val v:View = LayoutInflater.from(context).inflate(R.layout.item_row_concerns, parent, false)
    return ConcernItemHolder(v)
  }

  override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
    (holder as ConcernItemHolder).bind(
      list[position].id,
      list[position].title,
      list[position].description,
      list[position].postedBy,
      list[position].status)
  }

  override fun getItemCount(): Int {
    return list.size
  }

  class ConcernItemHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    fun bind(id: String, title: String, description: String, postedBy: String, status: Int) {
      itemView.title_textView.text = title
      itemView.description_textView.text = description
      itemView.postedBy_textView.text = postedBy
    }
  }
}

package com.example.myapplication.data

class MessageData(
    var id: String,
    var name: String,
    var sendBy: String,
    var receivedBy: String,
    var content: String,
    var status: Boolean,
    var readAt: String,
    var createdAt: String,
    var updatedAt: String,
)

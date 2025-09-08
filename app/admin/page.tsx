"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
  LogOut,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for dashboard
const dashboardStats = {
  totalRevenue: 45678.9,
  totalOrders: 1234,
  totalProducts: 156,
  totalUsers: 2890,
  revenueChange: 12.5,
  ordersChange: -3.2,
  productsChange: 8.1,
  usersChange: 15.3,
}

const salesData = [
  { month: "Jan", revenue: 4000, orders: 120 },
  { month: "Feb", revenue: 3000, orders: 98 },
  { month: "Mar", revenue: 5000, orders: 150 },
  { month: "Apr", revenue: 4500, orders: 135 },
  { month: "May", revenue: 6000, orders: 180 },
  { month: "Jun", revenue: 5500, orders: 165 },
]

const categoryData = [
  { name: "Electronics", value: 45, color: "#f59e0b" },
  { name: "Clothing", value: 25, color: "#3b82f6" },
  { name: "Home & Garden", value: 20, color: "#10b981" },
  { name: "Sports", value: 10, color: "#ef4444" },
]

const recentOrders = [
  {
    id: "FMOS123456",
    customer: "জন ডো",
    email: "john@example.com",
    total: 299.99,
    status: "প্রক্রিয়াধীন",
    date: "2024-01-15",
  },
  {
    id: "FMOS123457",
    customer: "জেন স্মিথ",
    email: "jane@example.com",
    total: 149.99,
    status: "পাঠানো হয়েছে",
    date: "2024-01-14",
  },
  {
    id: "FMOS123458",
    customer: "বব জনসন",
    email: "bob@example.com",
    total: 89.99,
    status: "ডেলিভার হয়েছে",
    date: "2024-01-13",
  },
]

const recentProducts = [
  {
    id: 1,
    name: "প্রিমিয়াম ওয়্যারলেস হেডফোন",
    category: "ইলেকট্রনিক্স",
    price: 299.99,
    stock: 15,
    status: "সক্রিয়",
    image: "/premium-wireless-headphones.png",
  },
  {
    id: 2,
    name: "গেমিং মেকানিক্যাল কীবোর্ড",
    category: "ইলেকট্রনিক্স",
    price: 149.99,
    stock: 8,
    status: "সক্রিয়",
    image: "/gaming-mechanical-keyboard.png",
  },
  {
    id: 3,
    name: "ওয়্যারলেস মাউস",
    category: "ইলেকট্রনিক্স",
    price: 79.99,
    stock: 0,
    status: "স্টক শেষ",
    image: "/placeholder.svg",
  },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
      case "ডেলিভার হয়েছে":
        return "bg-green-100 text-green-800"
      case "shipped":
      case "পাঠানো হয়েছে":
        return "bg-blue-100 text-blue-800"
      case "processing":
      case "প্রক্রিয়াধীন":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
      case "বাতিল":
        return "bg-red-100 text-red-800"
      case "active":
      case "সক্রিয়":
        return "bg-green-100 text-green-800"
      case "out of stock":
      case "স্টক শেষ":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-bold text-amber-600">
                FMOSWEB অ্যাডমিন
              </Link>
              <Badge className="bg-amber-100 text-amber-800">ড্যাশবোর্ড</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                সেটিংস
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                <LogOut className="h-4 w-4 mr-2" />
                লগআউট
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট আয়</p>
                  <p className="text-2xl font-bold text-gray-900">৳{dashboardStats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{dashboardStats.revenueChange}%</span>
                <span className="text-sm text-gray-500 ml-2">গত মাস থেকে</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট অর্ডার</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalOrders.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">{dashboardStats.ordersChange}%</span>
                <span className="text-sm text-gray-500 ml-2">গত মাস থেকে</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট পণ্য</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalProducts}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{dashboardStats.productsChange}%</span>
                <span className="text-sm text-gray-500 ml-2">গত মাস থেকে</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট ব্যবহারকারী</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-full">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{dashboardStats.usersChange}%</span>
                <span className="text-sm text-gray-500 ml-2">গত মাস থেকে</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>আয় ও অর্ডারের ট্রেন্ড</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ক্যাটেগরি অনুযায়ী বিক্রয়</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">সাম্প্রতিক অর্ডার</TabsTrigger>
            <TabsTrigger value="products">পণ্য ব্যবস্থাপনা</TabsTrigger>
            <TabsTrigger value="users">ব্যবহারকারী ব্যবস্থাপনা</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>সাম্প্রতিক অর্ডার</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    এক্সপোর্ট
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    ফিল্টার
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-semibold">#{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customer}</p>
                            <p className="text-xs text-gray-500">{order.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">তারিখ</p>
                            <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">মোট</p>
                            <p className="font-bold">৳{order.total}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>পণ্য ব্যবস্থাপনা</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="পণ্য খুঁজুন..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    <Plus className="h-4 w-4 mr-2" />
                    পণ্য যোগ করুন
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-balance">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="font-bold">৳{product.price}</span>
                            <span className="text-sm text-gray-600">স্টক: {product.stock}</span>
                            <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>ব্যবহারকারী ব্যবস্থাপনা</CardTitle>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="ভূমিকা অনুযায়ী ফিল্টার" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব ব্যবহারকারী</SelectItem>
                      <SelectItem value="admin">অ্যাডমিন</SelectItem>
                      <SelectItem value="customer">কাস্টমার</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    ব্যবহারকারী এক্সপোর্ট
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">ব্যবহারকারী ব্যবস্থাপনা</h3>
                  <p className="text-gray-600 mb-4">উন্নত ব্যবহারকারী ব্যবস্থাপনা ফিচার শীঘ্রই আসছে</p>
                  <Button variant="outline">সব ব্যবহারকারী দেখুন</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

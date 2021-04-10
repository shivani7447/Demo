USE [master]
GO
/****** Object:  Database [RentDB]    Script Date: 10-04-2021 10:52:18 ******/
CREATE DATABASE [RentDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'RentDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\RentDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'RentDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\RentDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [RentDB] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [RentDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [RentDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [RentDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [RentDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [RentDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [RentDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [RentDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [RentDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [RentDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [RentDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [RentDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [RentDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [RentDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [RentDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [RentDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [RentDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [RentDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [RentDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [RentDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [RentDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [RentDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [RentDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [RentDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [RentDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [RentDB] SET  MULTI_USER 
GO
ALTER DATABASE [RentDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [RentDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [RentDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [RentDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [RentDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [RentDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'RentDB', N'ON'
GO
ALTER DATABASE [RentDB] SET QUERY_STORE = OFF
GO
USE [RentDB]
GO
/****** Object:  Table [dbo].[Area]    Script Date: 10-04-2021 10:52:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Area](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[IsActive] [bit] NULL,
	[CreatedOn] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Building]    Script Date: 10-04-2021 10:52:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Building](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[Name] [nvarchar](300) NULL,
	[Address] [nvarchar](500) NULL,
	[IsActive] [bit] NULL,
	[CreatedOn] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Item]    Script Date: 10-04-2021 10:52:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Item](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AreaId] [int] NULL,
	[ArticleName] [nvarchar](255) NULL,
	[Quantity] [nvarchar](255) NULL,
	[ApprovalNo] [nvarchar](255) NULL,
	[Date] [datetime] NULL,
	[CpNo] [nvarchar](255) NULL,
	[SpNo] [nvarchar](255) NULL,
	[Remarks] [nvarchar](500) NULL,
	[IsActive] [bit] NULL,
	[CreatedOn] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 10-04-2021 10:52:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](300) NULL,
	[Email] [nvarchar](300) NULL,
	[Phone] [nvarchar](300) NULL,
	[Password] [nvarchar](max) NULL,
	[IsActive] [bit] NULL,
	[CreatedOn] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Area] ON 

INSERT [dbo].[Area] ([Id], [Name], [IsActive], [CreatedOn]) VALUES (6, N'Mohali', 1, CAST(N'2021-04-10T09:27:13.030' AS DateTime))
INSERT [dbo].[Area] ([Id], [Name], [IsActive], [CreatedOn]) VALUES (7, N'Patiala', 1, CAST(N'2021-04-10T10:30:29.810' AS DateTime))
SET IDENTITY_INSERT [dbo].[Area] OFF
GO
SET IDENTITY_INSERT [dbo].[Building] ON 

INSERT [dbo].[Building] ([Id], [UserId], [Name], [Address], [IsActive], [CreatedOn]) VALUES (3, 2, N'Test', N'Test', 1, CAST(N'2021-04-10T07:43:42.640' AS DateTime))
SET IDENTITY_INSERT [dbo].[Building] OFF
GO
SET IDENTITY_INSERT [dbo].[Item] ON 

INSERT [dbo].[Item] ([Id], [AreaId], [ArticleName], [Quantity], [ApprovalNo], [Date], [CpNo], [SpNo], [Remarks], [IsActive], [CreatedOn]) VALUES (1, 6, N'Test', N'1', N'123', CAST(N'2021-04-10T00:00:00.000' AS DateTime), N'12', N'1234', N'test', 1, CAST(N'2021-04-10T10:11:39.943' AS DateTime))
INSERT [dbo].[Item] ([Id], [AreaId], [ArticleName], [Quantity], [ApprovalNo], [Date], [CpNo], [SpNo], [Remarks], [IsActive], [CreatedOn]) VALUES (2, 7, N'Demo', N'12', N'34', CAST(N'2021-04-11T00:00:00.000' AS DateTime), N'23', N'344', N'demo', 1, CAST(N'2021-04-10T10:31:21.510' AS DateTime))
SET IDENTITY_INSERT [dbo].[Item] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Name], [Email], [Phone], [Password], [IsActive], [CreatedOn]) VALUES (2, N'Shivani Rana', N'shvnirna@gmail.com', N'9915150718', N'MTIzNDU2', 1, CAST(N'2021-04-10T07:10:52.180' AS DateTime))
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
USE [master]
GO
ALTER DATABASE [RentDB] SET  READ_WRITE 
GO
